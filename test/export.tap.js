'use strict';

var formatx = require('../');
var scotchTape = require('scotch-tape');

var test = scotchTape();

test('string-format-x', function run(it) {
  it('should export correctly', function should(t) {
    t.ok(typeof formatx === 'function', 'resolve-data exported correctly');
    t.end();
  });
});
