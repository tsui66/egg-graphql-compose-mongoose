'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async configWillLoad() {
    // 保证graphql挂载在第一个
    // this.app.config.coreMiddleware.unshift('graphql');
  }

  async didLoad() {
    require('./lib/load_schema')(this.app);
  }
}

module.exports = AppBootHook;
