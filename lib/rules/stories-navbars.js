'use strict';

var fs = require('fs');
var path = require('path');

var PATH_REGEX = /\/src\/navbars\/([^/]+?)\/presentation.js$/i;
var EXPECTED_FILENAME = 'stories.js';

var meta = {
  docs: {
    description: 'navbars must have accompanying stories'
  }
};

var create = function create(context) {
  var filepath = context.getFilename();
  if (!PATH_REGEX.test(filepath)) return {};

  var dirname = path.dirname(filepath);
  var storyPath = path.join(dirname, EXPECTED_FILENAME);

  if (!fs.existsSync(storyPath)) {
    context.report({
      message: '\'' + filepath + '\' must have an accompanying \'' + EXPECTED_FILENAME + '\' file',
      loc: {
        start: { line: 1, col: 0 },
        end: { line: 1, col: 0 }
      }
    });
  }

  return {};
};

module.exports = { create: create, meta: meta };