'use strict';

/**
 * Module dependencies.
 */

const config = require('config');
const convert = require('koa-convert');
const bodyParser = require('koa-body');
const compress = require('koa-compress');
const error = require('koa-error');
const co = require('co');
const Koa = require('koa');
const app = new Koa();

/**
 * Environment variables.
 */

let env = config.util.getEnv('NODE_ENV');
let port = config.get('API.port');

/**
 * Setup middlewares.
 */

function setupMiddlewares() {

  // parse body
  app.use(convert(bodyParser()));

  // compression
  app.use(convert(compress()));

  // error handler
  app.use(convert(error()));

  // routing
  let router = require('src/routes/');
  app.use(router.routes());

}

/**
 * Init.
 */

co(function* init() {

  setupMiddlewares();

}).then(() => {
  // error handler
  app.on('error', (err) => {
    if (env === 'production') {
      // TODO: report err to cloud (ELK)
    } else {
      console.log(err.stack);
    }
  });

  // start server
  app.listen(port);
}, err => {
  console.log(err.stack)
});
