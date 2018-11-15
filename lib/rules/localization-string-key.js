'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var path = require('path');
var fs = require('fs');

var meta = {
  docs: {
    description: 'localization string key must refer to a string that exist'
  }
};

var BEGINNING_OF_FILE = {
  start: { line: 1, column: 0 },
  end: { line: 1, column: 0 }
};

var create = function create(context) {
  var filename = context.getFilename();
  var hasLoadedJson = false;
  var stringsMap = null;

  if (path.basename(filename) !== 'strings.js') return {};

  var loadStringJson = function loadStringJson() {
    // Ensure we don't load strings.json more than once
    if (hasLoadedJson) return;
    hasLoadedJson = true;
    // Ensure that a strings.json file exists
    var stringsJsonPath = path.join(path.dirname(filename), 'strings.json');
    if (!fs.existsSync(stringsJsonPath)) {
      context.report({ message: 'missing a \'strings.json\' file', loc: BEGINNING_OF_FILE });
      return;
    }
    // Ensure that the strings.json file is valid JSON
    var stringsJsonText = fs.readFileSync(stringsJsonPath, 'utf8');
    try {
      stringsMap = JSON.parse(stringsJsonText);
    } catch (err) {
      context.report({ message: '\'strings.json\' file is invalid', loc: BEGINNING_OF_FILE });
      return;
    }
    // Ensure that the strings.json file is an object
    if (!stringsMap || (typeof stringsMap === 'undefined' ? 'undefined' : _typeof(stringsMap)) !== 'object') {
      context.report({
        message: '\'strings.json\' file does not contain a string map',
        loc: BEGINNING_OF_FILE
      });
    }
  };

  return {
    CallExpression: function CallExpression(node) {
      var callee = node.callee;

      var args = node.arguments;

      // Ensure that the node is a t(...) call
      if (!callee) return;
      if (callee.name !== 't') return;
      if (!args || !args.length) return;

      var firstArgument = args[0];

      // Attempt to load strings.json
      loadStringJson();

      // Ensure that the first argument is a string
      if (firstArgument.type !== 'Literal') {
        context.report(firstArgument, 'the first argument to `t()` should be a string literal');
        return;
      }

      // Ensure that the localization entry exists and is a string
      var stringKey = firstArgument.value;
      if (stringsMap && typeof stringsMap[stringKey] !== 'string') {
        context.report(firstArgument, 'the string key \'' + stringKey + '\' does not point to a valid string');
      }
    }
  };
};

module.exports = { create: create, meta: meta };