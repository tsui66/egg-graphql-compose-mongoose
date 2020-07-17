'use strict';
const path = require('path');
const fs = require('fs');
const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { composeWithDataLoader } = require('graphql-compose-dataloader');

/*
前提：此插件依赖于 mogoose 插件加载并且实例化 mongodb schema model
1. 遍历 model 文件夹 ，CONVERT MONGOOSE MODEL TO GraphQL PIECES
2. 将转换 GraphQL PIECES 挂载在 app.graphqlTC
3. 遍历 graphql 文件夹，加载解析器resolvers
4, 构建schema
*/

module.exports = app => {
  const baseModelPath = path.join(app.baseDir, 'app/model/');
  const isExistsModel = fs.existsSync(baseModelPath);

  const baseResolverPath = path.join(app.baseDir, 'app/graphql/');
  const isExistsResolver = fs.existsSync(baseResolverPath);


  if (isExistsModel && isExistsResolver) {
    const dpModelDir = fs.readdirSync(baseModelPath);
    const graphqlTC = {};
    dpModelDir.forEach(file => {
      const dpFile = path.join(baseModelPath, file);
      const stat = fs.statSync(dpFile);
      // 获取结尾为.js的文件名称
      if (stat.isFile() && file.endsWith('.js')) {
        // 需要判断 mogoose 插件是否以及加载 model
        const fileName = path.basename(dpFile, '.js');
        // CONVERT MONGOOSE MODEL TO GraphQL PIECES
        if (app.model[fileName]) {
          // DataLoader 批量处理短时间内的I/O请求，并且支持缓存
          Object.assign(graphqlTC, { [`${fileName}TC`]: composeWithDataLoader(composeWithMongoose(app.model[fileName]), { cacheExpiration: 700 }) });
        }
      }
    });


    const dpResolverDir = fs.readdirSync(baseResolverPath);
    // 加载解析器
    dpResolverDir.forEach(file => {
      const dpFile = path.join(baseResolverPath, file);
      const stat = fs.statSync(dpFile);
      if (stat.isFile() && file.endsWith('.js')) {
        const resolver = require(path.join(baseResolverPath, file));
        resolver instanceof 'Function' ? resolver((graphqlTC, schemaComposer)) : null;
      }
    });

    const graphqlSchema = schemaComposer.buildSchema();
    Object.assign(app, { graphqlSchema, graphqlTC });
  }
};
