'use strict';

/**
 * Module dependencies
 */

const co = require('co');
const phantom = require('phantom');
const utils = require('src/lib/utils');
const Router = require('koa-router');

/**
 * Create router
 */

const router = new Router();

/**
 * Index page
 */

router.get('/', co.wrap(function* (ctx, next) {
  const url = ctx.query.url ? utils.url(ctx.query.url) : null;
  const format = ctx.query.format || 'png';

  if (!url) {
    return ctx.body = {
      error: {
        message: 'url query param is required'
      }
    }
  }

  const ph = yield phantom.create();
  const page = yield ph.createPage();
  const status = yield page.open(url);

  let result = null;
  if (status === 'success') {
    result = yield page.renderBase64(format);
  }

  ctx.type = 'html';
  ctx.body = `<img src="data:image/gif;base64,${result}">`;
  page.close();
  ph.exit();
}));

/**
 * Healthcheck
 */

router.get('/ping', co.wrap(function* (ctx, next) {
  ctx.body = {
    message: 'pong'
  };
}));

/**
 * Expose `router`
 */

module.exports = router;
