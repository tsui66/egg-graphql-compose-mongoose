'use strict';

exports.keys = '123456';

exports.mongoose = {
  url: 'mongodb://10.10.0.138/example',
  options: { useUnifiedTopology: true },
};

exports.graphql = {
  router: '/graphql',
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
  // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
  graphiql: true,
  introspection: true,
  // 是否设置默认的Query和Mutation, 默认关闭
  defaultEmptySchema: true,
  // graphQL 路由前的拦截器
  // * onPreGraphQL() {},
  // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
  // * onPreGraphiQL() {},
};

exports.middleware = [ 'graphql' ];
