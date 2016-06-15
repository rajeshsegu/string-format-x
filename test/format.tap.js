'use strict';

var formatx = require('../');
var scotchTape = require('scotch-tape');

var test = scotchTape();
var data = {
  name: 'Test',
  city: 'SF',
  state: 'CA'
};

test('resolve-data: Object', function run(it) {
  it('should handle simple object', function should(t) {
    var obj = {
      name: '{name}',
      addr: '{city}, {state}'
    };

    t.looseEquals(formatx(obj, data), {
      name: 'Test',
      addr: 'SF, CA'
    });
    t.end();
  });

  it('should handle deeply nested object', function should(t) {
    var obj = {
      name: '{name}',
      addr: {
        display: '{city}, {state}',
        code: '{state}-{city}',
        items: ['{state}', '{city}']
      }
    };

    t.looseEquals(formatx(obj, data), {
      name: 'Test',
      addr: {
        display: 'SF, CA',
        code: 'CA-SF',
        items: ['CA', 'SF']
      }
    });
    t.end();
  });

  it('should handle {} escape', function should(t) {
    var obj = {
      name: '{name}',
      addr: '{{city}}, {state}'
    };

    t.looseEquals(formatx(obj, data), {
      name: 'Test',
      addr: '{city}, CA'
    });
    t.end();
  });
});

test('resolve-data: Array', function run(it) {
  it('should handle simple array', function should(t) {
    var arr = ['{city}', '{state}'];
    t.looseEquals(formatx(arr, data), ['SF', 'CA']);
    t.end();
  });

  it('should handle deeply nested array', function should(t) {
    var obj = [{
      addr: {
        display: '{city}, {state}'
      }
    }, '{name}'];

    t.looseEquals(formatx(obj, data), [{
      addr: {
        display: 'SF, CA'
      }
    }, 'Test']);
    t.end();
  });
});

test('resolve-data: Primitives', function run(it) {
  it('should handle simple boolean', function should(t) {
    t.equals(formatx(true, {}), true);
    t.equals(formatx(false, {}), false);
    t.end();
  });

  it('should handle simple number', function should(t) {
    t.equals(formatx(1, {}), 1);
    t.equals(formatx(2, {}), 2);
    t.end();
  });

  it('should handle empty values', function should(t) {
    t.equals(formatx(null, {}), null);
    t.equals(formatx(undefined, {}), undefined);
    t.end();
  });
});
