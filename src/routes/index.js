'use strict';

/**
 * Module dependencies
 */

const co = require('co');
const Router = require('koa-router');

/**
 * Create router
 */

let router = new Router();

/**
 * Index page
 */

router.get('/', co.wrap(function* (ctx, next) {
  ctx.body = {
    message: 'nested pong'
  };
}));

/**
 * Register memes routes
 */

router.use(router.routes());

/**
 * Respond to OPTIONS requests
 */

router.use(router.allowedMethods());

/**
 * Expose `router`
 */

module.exports = router;
