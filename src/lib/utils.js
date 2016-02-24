'use strict';

/**
 * Module dependencies
 */

const crypto = require('crypto');

/**
 * Expose utils
 */

let utils = module.exports = {

  /**
   * MD5 the given `str`.
   */

  md5(str) {
    return crypto
      .createHash('md5')
      .update(str)
      .digest('hex');
  },

  /**
   * Imply "http://" for `url`
   */

  url(url) {
    if (~url.indexOf('://')) return url;
    return 'http://' + url;
  }

}
