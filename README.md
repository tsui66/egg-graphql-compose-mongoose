# egg-graphql-mongoose

[![NPM version][npm-image]][npm-url]
[![build status][action-image]][action-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
![]()

[npm-image]: https://img.shields.io/npm/v/egg-graphql-mongoose.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-graphql-mongoose
[action-image]: https://github.com/Quinton/egg-graphql-mongoose/workflows/build/badge.svg
[action-url]: https://github.com/Quinton/egg-graphql-mongoose/actions
[codecov-image]: https://codecov.io/gh/Quinton/egg-graphql-mongoose/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/Quinton/egg-graphql-mongoose
[david-image]: https://img.shields.io/david/Quinton/egg-graphql-mongoose.svg?style=flat-square
[david-url]: https://david-dm.org/Quinton/egg-graphql-mongoose
[snyk-image]: https://snyk.io/test/npm/egg-graphql-mongoose/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-graphql-mongoose
[download-image]: https://img.shields.io/npm/dm/egg-graphql-mongoose.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-graphql-mongoose

[GraphQL](http://facebook.github.io/graphql/)使用 Schema 来描述数据，并通过制定和实现 GraphQL 规范定义了支持 Schema 查询的 DSQL （Domain Specific Query Language，领域特定查询语言，由 FACEBOOK 提出。

![graphql](http://upload-images.jianshu.io/upload_images/551828-8d055caea7562605.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

传统 web 应用通过开发服务给客户端提供接口是很常见的场景。而当需求或数据发生变化时，应用需要修改或者重新创建新的接口。长此以后，会造成服务器代码的不断增长，接口内部逻辑复杂难以维护。而 GraphQL 则通过以下特性解决这个问题：

- 声明式。查询的结果格式由请求方（即客户端）决定而非响应方（即服务器端）决定。你不需要编写很多额外的接口来适配客户端请求
- 可组合。GraphQL 的查询结构可以自由组合来满足需求。
- 强类型。每个 GraphQL 查询必须遵循其设定的类型才会被执行。

也就是说，通过以上的三个特性，当需求发生变化，客户端只需要编写能满足新需求的查询结构，如果服务端能提供的数据满足需求，服务端代码几乎不需要做任何的修改。

目前 egg-graphql-mongoose 已经完全支持在 egg 中使用 GraphQL 查询语法，可直接查看文末参考链接，下文为插件设计。

## 技术选型

我们会使用 [graphql-compose-mongoose](https://github.com/graphql-compose/graphql-compose-mongoose) 扩展为插件；配合 eggjs 完成 GraphQL 服务的搭建。 GraphQL Tools 建立了一种 GraphQL-first 的开发哲学，主要体现在以下三个方面：

- Mongoose model 即 GraphQLType，内置 CRUD resolvers。
- 兼容使用官方的 GraphQL schema 进行编程。 GraphQL Tools 提供工具，让你可以书写标准的 GraphQL schema，并完全支持里面的特性。
- 为很多特殊场景提供标准解决方案。最大限度标准化 GraphQL 应用。

这些我们都会集成到 [egg-graphql-mongoose](https://github.com/Quinton/egg-graphql-mongoose) 插件中。

- graphql-compose-mongoose 官方介绍
  > This is a plugin for graphql-compose, which derives GraphQLType from your mongoose model. Also derives bunch of internal GraphQL Types. Provide all CRUD > resolvers, including graphql connection, also provided basic search via operators ($lt, $gt and so on).

### 安装与配置

安装对应的依赖 [egg-graphql-mongoose] ：

```bash
$ npm i --save egg-graphql-mongoose
```

开启插件：

```js
// config/plugin.js
exports.graphql = {
  enable: true,
  package: 'egg-graphql-mongoose',
};
```

在 `config/config.${env}.js` 配置提供 graphql 的路由。

```js
// config/config.${env}.js
exports.graphql = {
  router: '/graphql',
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
  // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
  graphiql: true,
  //是否设置默认的Query和Mutation, 默认关闭
  defaultEmptySchema:true,
  // graphQL 路由前的拦截器
  onPreGraphQL: function* (ctx) {},
  // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
  onPreGraphiQL: function* (ctx) {},
  // apollo server的透传参数，参考[文档](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#parameters)
  apolloServerOptions: {
    rootValue,
    formatError,
    formatResponse,
    mocks,
    schemaDirectives,
    introspection,
    playground,
    debug,
    validationRules,
    tracing,
    cacheControl,
    subscriptions,
    engine,
    persistedQueries,
    cors,
  }
};

// 添加中间件拦截请求
exports.middleware = [ 'graphql-mongoose' ];
```

## 使用方式

请将 graphql 相关逻辑放到 app/graphql 下，请参考测试用例。

目录结构如下

```
.
├── app
│   ├── graphql
│   │   ├── User.js
│   │   │
│   ├── model
│   │   └── User.js
│   ├── public
│   └── router.js

```

## 参考文章

- [graphql官网](http://facebook.github.io/graphql)

- [如何在egg中使用graphql](https://github.com/Quinton/egg-graphql-mongoose-example)

- [graphql-compose](https://github.com/nodkz/graphql-compose)

- [graphql-compose-mongoose](https://github.com/graphql-compose/graphql-compose-mongoose)

## 协议

[MIT](LICENSE)
