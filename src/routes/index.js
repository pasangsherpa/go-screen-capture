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

router.get('/', co.wrap(function*(ctx, next) {
  const url = ctx.query.url ? utils.url(ctx.query.url) : null;
  const height = ctx.query.h || 1024;
  const width = ctx.query.w || 600;
  const format = ctx.query.format || 'png';
  const acccepts = ctx.accepts('html', 'json');

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

  let img = null;
  if (status === 'success') {
    yield page.property('viewportSize', { width: width, height: height });
    img = yield page.renderBase64(format);
  }

  switch (acccepts) {
    case 'json':
      ctx.type = 'json';
      ctx.body = {
        base64: `data:image/gif;base64,${img}`
      }
      break;
    default:
      ctx.type = 'html';
      ctx.body = `<img src="data:image/gif;base64,${img}">`;
      break;
  }

  page.close();
  ph.exit();
}));

/**
 * Healthcheck
 */

router.get('/ping', co.wrap(function*(ctx, next) {
  ctx.body = {
    message: 'pong'
  };
}));

/**
 * Expose `router`
 */

module.exports = router;
