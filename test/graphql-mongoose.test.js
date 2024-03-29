'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/graphql-mongoose.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/graphql-mongoose-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, graphqlMongoose')
      .expect(200);
  });

  it('should get graphiql html response', async () => {
    app.mockHttpclient('/graphql', 'GET', {});
    const result = await app.httpRequest()
      .get('/graphql')
      .set('Accept', 'text/html')
      .expect(200);
    assert(result.type, 'text/html');
  });
});
