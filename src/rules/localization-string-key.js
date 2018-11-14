const path = require('path');
const fs = require('fs');

const meta = {
  docs: {
    description: 'localization string key must refer to a string that exist',
  },
};

const BEGINNING_OF_FILE = {
  start: { line: 1, column: 0 },
  end: { line: 1, column: 0 },
};

const create = (context) => {
  const filename = context.getFilename();
  let hasLoadedJson = false;
  let stringsMap = null;

  if (path.basename(filename) !== 'strings.js') return {};

  const loadStringJson = () => {
    // Ensure we don't load strings.json more than once
    if (hasLoadedJson) return;
    hasLoadedJson = true;
    // Ensure that a strings.json file exists
    const stringsJsonPath = path.join(path.dirname(filename), 'strings.json');
    if (!fs.existsSync(stringsJsonPath)) {
      context.report({ message: 'missing a \'strings.json\' file', loc: BEGINNING_OF_FILE });
      return;
    }
    // Ensure that the strings.json file is valid JSON
    const stringsJsonText = fs.readFileSync(stringsJsonPath, 'utf8');
    try {
      stringsMap = JSON.parse(stringsJsonText);
    } catch (err) {
      context.report({ message: '\'strings.json\' file is invalid', loc: BEGINNING_OF_FILE });
      return;
    }
    // Ensure that the strings.json file is an object
    if (!stringsMap || typeof stringsMap !== 'object') {
      context.report({
        message: '\'strings.json\' file does not contain a string map',
        loc: BEGINNING_OF_FILE,
      });
    }
  };

  return {
    CallExpression: (node) => {
      const { callee } = node;
      const args = node.arguments;

      // Ensure that the node is a t(...) call
      if (!callee) return;
      if (callee.name !== 't') return;
      if (!args || !args.length) return;

      const firstArgument = args[0];

      // Attempt to load strings.json
      loadStringJson();

      // Ensure that the first argument is a string
      if (firstArgument.type !== 'Literal') {
        context.report(firstArgument, 'the first argument to `t()` should be a string literal');
        return;
      }

      // Ensure that the localization entry exists and is a string
      const stringKey = firstArgument.value;
      if (stringsMap && typeof stringsMap[stringKey] !== 'string') {
        context.report(firstArgument, `the string key '${stringKey}' does not point to a valid string`);
      }
    },
  };
};

module.exports = { create, meta };
