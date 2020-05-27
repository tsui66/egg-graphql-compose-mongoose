# egg-graphql-mongoose

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-graphql-mongoose.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-graphql-mongoose
[travis-image]: https://img.shields.io/travis/eggjs/egg-graphql-mongoose.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-graphql-mongoose
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-graphql-mongoose.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-graphql-mongoose?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-graphql-mongoose.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-graphql-mongoose
[snyk-image]: https://snyk.io/test/npm/egg-graphql-mongoose/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-graphql-mongoose
[download-image]: https://img.shields.io/npm/dm/egg-graphql-mongoose.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-graphql-mongoose

<!--
Description here.
-->

## Install

```bash
$ npm i egg-graphql-mongoose --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.graphqlMongoose = {
  enable: true,
  package: 'egg-graphql-mongoose',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.graphqlMongoose = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
