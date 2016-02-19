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
 * Expose `router`
 */

module.exports = router;
