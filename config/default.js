'use strict';

/**
 * Default configurations.
 */

module.exports = {
  API: {
    port: process.env.PORT || 8080,
    url: process.env.API_URL || 'http://localhost:3000/api'
  }
}
