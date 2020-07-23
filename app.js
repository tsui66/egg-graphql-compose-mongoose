'use strict';

const path = require('path');
const fs = require('fs');
const GraphqlCompose = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { composeWithDataLoader } = require('graphql-compose-dataloader-new');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async configWillLoad() {
    // this.app.config.coreMiddleware.unshift('graphql');
  }

  async didLoad() {
    const graphql_schema_dir = path.join(
      this.app.config.baseDir,
      'app/graphql/'
    );
    this.app.graphqlTC = {};
    for (const file of fs.readdirSync(graphql_schema_dir)) {
      if (file.endsWith('.js')) {
        const baseName = path.basename(`app/graphql/${file}`, '.js');
        if (!baseName) {
          this.app.coreLogger.error(
            `[egg-graphql-mongoose] app/graphql/${file} not exists`
          );
          throw new Error(
            `[egg-graphql-mongoose] app/graphql/${file} not exists`
          );
        } else {
          this.app.graphqlTC[`${baseName}TC`] = composeWithDataLoader(
            composeWithMongoose(this.app.model[baseName])
          );
        }
      } else {
        this.app.coreLogger.warn(
          '[egg-graphql-mongoose] Invalid graphql schema file.'
        );
      }
    }
    for (const file of fs.readdirSync(graphql_schema_dir)) {
      if (file.endsWith('.js')) {
        this.app.loader.loadFile(
          path.join(this.app.config.baseDir, `app/graphql/${file}`),
          {
            app: this.app,
            ctx: this.app.createAnonymousContext(),
          },
          {
            composeWithMongoose,
            GraphqlCompose,
          }
        );
        const graphqlSchema = GraphqlCompose.schemaComposer.buildSchema();
        this.app.graphqlSchema = graphqlSchema;
      } else {
        this.app.coreLogger.warn(
          '[egg-graphql-mongoose] Invalid graphql schema file.'
        );
      }
    }
  }
}

module.exports = AppBootHook;
