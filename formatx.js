'use strict';

var map = require('object.map');
var strformat = require('string-format');

function resolve(entity, data) {
  var type = typeof entity;

  if (type === 'undefined' || entity === null) {
    return entity;
  }

  if (type === 'string') {
    return strformat(entity, data);
  }

  if (type === 'function') {
    return resolve(entity.call(entity, data));
  }

  if (type === 'object') {
    if (Array.isArray(entity)) {
      return entity.map(function map(val) {
        return resolve(val, data);
      });
    }

    return map(entity, function map(val) {
      return resolve(val, data);
    });
  }

  return entity;
}

function formatx(entity, data) {
  return resolve(entity, data || {});
}

module.exports = formatx;
