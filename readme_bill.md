### 简介
使用 mongodb schema 和 查询方法组装转换为 GraphQL Schema 实现 GraphQL API

### 使用
配置 config/config.default.js , 添加中间件 graphql 
```js
config.middleware = [ 'graphql' ];

config.graphql = {
  router: '/graphql',
  graphiql: true,
};
```

添加插件
```js
module.exports = {
  graphql: {
    enable: true,
    package: 'egg-graphql-mongoose',
  },
};
```

本插件需要和 mongodb 配合使用，需要在app/model下定义模型，并且在app/graphql下定义对应模型名称的解析器，详细请查看测试代码