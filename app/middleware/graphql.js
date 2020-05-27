'use strict';

const { ApolloServer } = require('apollo-server-koa');

module.exports = (_, app) => {
  const options = app.config.graphqlMongoose;
  const graphQLRouter = options.router;
  let graphiql = true;

  if (options.graphiql === false) {
    graphiql = false;
  }

  return async (ctx, next) => {
    /* istanbul ignore else */
    if (ctx.path === graphQLRouter) {
      const server = new ApolloServer({
        schema: app.graphqlSchema,
        context: ({ ctx }) => (ctx),
        playground: graphiql,
        introspection: options.introspection,
      });
      server.applyMiddleware({ app, path: graphQLRouter });
    }
    await next();
  };
};
