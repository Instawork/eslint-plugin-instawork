'use strict';

var humps = require('humps');
var path = require('path');

/** Hacky way to pluralize an English word */
var pluralizeString = function pluralizeString(str) {
  return str + 's';
};

/** Hacky way to singularize an English word */
var singularizeString = function singularizeString(str) {
  return str.replace(/s$/i, '');
};

var capitalizeString = function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/** Returns the import statement (a string) given an ImportDeclaration node and ESLint context */
module.exports.getImportStatement = function (importDeclarationNode, context) {
  return context.getSourceCode().getText(importDeclarationNode).match(/^\s*(import\s+.+?)/)[1];
};

/** Returns the expected class name (based on Instawork conventions) given a path
 *  If suffixes is an array, will return an array of all expected import names with the specified
 *  suffixes. If suffixes is a string, will return the expected import name with the provided suffix
*/
module.exports.getExpectedClassName = function (dir, suffixes) {
  var camelized = humps.camelize(path.basename(dir));
  var capitalized = capitalizeString(camelized);
  if (!suffixes) return capitalized;

  if (suffixes.map) {
    return suffixes.map(function (suffix) {
      return capitalized + suffix;
    });
  }

  return capitalized + suffixes;
};

/** Returns the expected import name (based on Instawork conventions) given a ImportDeclaration node
 *  If suffixes is an array, will return an array of all expected import names with the specified
 *  suffixes. If suffixes is a string, will return the expected import name with the provided suffix
*/
module.exports.getExpectedImportName = function (importDeclarationNode, suffixes) {
  var importPath = importDeclarationNode.source.value;
  if (!importPath) return '';
  return module.exports.getExpectedClassName(importPath, suffixes);
};

/** Returns whether or not an ImportDeclaration node represents an import statement whose path
 *  matches pathRegex. Returns false for flow-type imports
 */
module.exports.isImportingPath = function (importDeclarationNode, pathRegex) {
  return importDeclarationNode.source.type === 'Literal' && pathRegex.test(importDeclarationNode.source.value) && importDeclarationNode.importKind === 'value';
};

/** Returns whether or not an ImportDeclaration node is a wildcard import.
 *  If expectedNames is passed-in (array|string), it will return false unless the import name
 *  matches expectedNames
 */
module.exports.isWildcardImport = function (importDeclarationNode, expectedNames) {
  if (importDeclarationNode.specifiers.length !== 1) return false;
  if (importDeclarationNode.specifiers[0].type !== 'ImportNamespaceSpecifier') return false;
  if (!expectedNames) return true;

  var importName = importDeclarationNode.specifiers[0].local.name;

  if (expectedNames.includes) {
    return expectedNames.includes(importName);
  }

  return expectedNames === importName;
};

/** Returns whether or not an ImportDeclaration node is a default import.
 *  If expectedNames is passed-in (array|string), it will return false unless the import name
 *  matches expectedNames
 */
module.exports.isDefaultImport = function (importDeclarationNode, expectedNames) {
  if (importDeclarationNode.specifiers.length !== 1) return false;
  if (importDeclarationNode.specifiers[0].type !== 'ImportDefaultSpecifier') return false;
  if (!expectedNames) return true;

  var importName = importDeclarationNode.specifiers[0].local.name;

  if (expectedNames.includes) {
    return expectedNames.includes(importName);
  }

  return expectedNames === importName;
};

/** Returns whether or not a path points to a story file */
module.exports.isStoryPath = function (filepath) {
  return !!filepath && typeof filepath === 'string' && !!path.basename(filepath).match(/^(.+\.)?stories.js$/i);
};

/** Returns the expected class name (based on Instawork conventions) given a path */
module.exports.getExpectedClassNameForPath = function (filepath) {
  var entityType = module.exports.getEntityTypeForPath(filepath);
  var isRootEntity = !!filepath.match(/(\/|^)src\/([^/]+)\/([^/]+)\/([^/]+)$/i);
  var baseClassName = capitalizeString(humps.camelize(path.basename(path.dirname(filepath))));

  return isRootEntity && entityType !== 'component' ? '' + baseClassName + capitalizeString(entityType) : baseClassName;
};

/** Given a filepath, returns the entity type (e.g. screen, service, navbar) */
module.exports.getEntityTypeForPath = function (filepath) {
  return singularizeString(filepath.match(/(\/|^)src\/(.+?)\//i)[2]);
};

/** Given a filepath, returns the expected Storybook entry name */
module.exports.getExpectedStoryNameForPath = function (filepath) {
  var entityType = capitalizeString(module.exports.getEntityTypeForPath(filepath));
  var className = module.exports.getExpectedClassNameForPath(filepath);
  return pluralizeString(entityType) + '/' + className;
};

/** Returns whether or not an ESPrima node is a story declaration (i.e. `storiesOf(...)`) */
module.exports.isStoryDeclarationNode = function (node) {
  return !!node && node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'storiesOf' && node.arguments.length > 0 && node.arguments[0].type === 'Literal';
};

/** Given a story declaration node, returns the story name */
module.exports.getStoryNameForStoryDeclarationNode = function (node) {
  return node.arguments[0].value;
};