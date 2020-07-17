### 简介
使用 mongodb schema 和 查询方法组装转换为 GraphQL Schema 实现 GraphQL API

使用 graphql-compose-dataloader 模块，二次封装 schema 减少I/O读取次数


### 缺点
1. 不支持在 SchemaType 中直接定义 directive,需要通过 wrapResolver 二次封装 resolver ,导致代码具有强关联
2. 不支持自动加载 resolver，需要自己添加关系结构

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