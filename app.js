'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    require('./lib/load_schema')(this.app);
  }
}

module.exports = AppBootHook;
