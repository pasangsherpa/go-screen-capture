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
  if (!url){
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
        return page.property('content');
      }
      return null;
    })
    .then(content => {
      let message = content ? content : 'Failed';
      page.close();
      ph.exit();
      ctx.body = {
        message: message
      }
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
