'use strict';

/**
 * Module dependencies
 */

const co = require('co');
const phantom = require('phantom');
const Router = require('koa-router');

/**
 * Create router
 */

const router = new Router();

/**
 * Index page
 */

router.get('/', co.wrap(function* (ctx, next) {
  let ph, page, url = ctx.query.url;
  if (!url) {
    return ctx.body = {
      error: {
        message: 'url query param is required'
      }
    }
  }
  return phantom.create()
    .then(p => {
      ph = p;
      return ph.createPage();
    })
    .then(p => {
      page = p;
      return page.open(url);
    })
    .then(status => {
      if (status === 'success') {
        return page.renderBase64('PNG');
      }
      return null;
    })
    .then(base64 => {
      ctx.type = 'html';
      ctx.body = `<img src="data:image/gif;base64,${base64}">`
      page.close();
      ph.exit();
    });
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
