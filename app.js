'use strict';

const path = require('path');
const fs = require('fs');
const GraphqlCompose = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async configWillLoad() {
    this.app.config.coreMiddleware.unshift('graphql');
  }

  async didLoad() {
    const graphql_schema_dir = path.join(this.app.config.baseDir, 'app/graphql/');
    for (const file of fs.readdirSync(graphql_schema_dir)) {
      if (file.endsWith('.js')) {
        this.app.loader.loadFile(path.join(this.app.config.baseDir, `app/graphql/${file}`), this.app, { composeWithMongoose, GraphqlCompose });
        const graphqlSchema = GraphqlCompose.schemaComposer.buildSchema();
        this.app.graphqlSchema = graphqlSchema;
      } else {
        this.app.coreLogger.warn('[egg-graphql-mongoose] Invalid graphql schema file.');
      }
    }
  }
}

module.exports = AppBootHook;
