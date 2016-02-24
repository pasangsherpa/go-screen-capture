'use strict';
var assert = require('assert');
var utils = require('src/lib/utils');

describe('utils', function () {
  it('should generate md5 of given string', function () {
    const foo_md5ed = 'acbd18db4cc2f85cedef654fccc4a4d8';
    const github_md5ed = 'bf215181b5140522137b3d4f6b73544a';
    assert.equal(utils.md5('foo'), foo_md5ed);
    assert.equal(utils.md5('github'), github_md5ed);
  });
});
