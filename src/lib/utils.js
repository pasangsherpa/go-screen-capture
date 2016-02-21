'use strict';

/**
 * Expose utils.
 */

let utils = module.exports = {

  /**
   * Imply "http://" for `url`.
   */

  url(url) {
    if (~url.indexOf('://')) return url;
    return 'http://' + url;
  }

}
