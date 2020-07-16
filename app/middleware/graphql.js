'use strict';

const { graphqlKoa } = require('apollo-server-koa/dist/koaApollo');

const { resolveGraphiQLString } = require('apollo-server-module-graphiql');

/**
 * @param {Object} options The `options` of graphiqlKoa.
 * @return {Promise} The result of the graphiqlKoa.
 */
function graphiqlKoa(options) {
  return ctx => {
    const query = ctx.request.query;
    return resolveGraphiQLString(query, options, ctx)
      .then(graphiqlString => {
        ctx.set('Content-Type', 'text/html');
        ctx.body = graphiqlString;
      });
  };
}

module.exports = (_, app) => {
  const options = app.config.graphql;
  const graphQLRouter = options.router;
  let graphiql = true;

  if (options.graphiql === false) {
    graphiql = false;
  }

  return async (ctx, next) => {
    /* istanbul ignore else */
    if (ctx.path === graphQLRouter) {
      const {
        onPreGraphiQL,
        onPreGraphQL,
        apolloServerOptions,
      } = options;
      if (ctx.request.accepts([ 'json', 'html' ]) === 'html' && graphiql) {
        if (onPreGraphiQL) {
          await onPreGraphiQL(ctx);
        }
        return graphiqlKoa({
          endpointURL: graphQLRouter,
        })(ctx);
      }
      if (onPreGraphQL) {
        await onPreGraphQL(ctx);
      }
      const serverOptions = Object.assign(
        {},
        apolloServerOptions,
        {
          schema: app.graphqlSchema,
          context: ctx,
        }
      );
      return graphqlKoa(serverOptions)(ctx);
    }
    await next();
  };
};
