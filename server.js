'use strict';

/**
 * Module dependencies
 */

const bodyParser = require('koa-body');
const compress = require('koa-compress');
const convert = require('koa-convert');
const config = require('config');
const error = require('koa-error');
const Koa = require('koa');
const co = require('co');
const app = new Koa();

/**
 * Environment variables
 */

const NODE_ENV = config.util.getEnv('NODE_ENV');
const API_PORT = config.get('API.port');

/**
 * Setup middlewares
 */

function setupMiddlewares() {

  // parse body
  app.use(convert(bodyParser()));

  // compression
  app.use(convert(compress()));

  // error handler
  app.use(convert(error()));

  // routing
  const router = require('src/routes/');
  app.use(router.routes());

  // respond to OPTIONS requests
  app.use(router.allowedMethods());
}

/**
 * Init
 */

co(function* init() {

  setupMiddlewares();

}).then(() => {
  // error handler
  app.on('error', (err) => {
    if (NODE_ENV === 'production') {
      // TODO: report err to cloud (ELK)
    } else {
      console.log(err.stack);
    }
  });

  // start server
  app.listen(API_PORT);
}, err => {
  console.log(err.stack)
});
