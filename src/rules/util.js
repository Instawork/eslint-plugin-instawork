/* eslint-disable prettier/prettier */
// @flow

const humps = require('humps');
const path = require('path');

/** Hacky way to pluralize an English word */
const pluralizeString = (str) => `${str}s`;

/** Hacky way to singularize an English word */
const singularizeString = (str) => str.replace(/s$/i, '');

const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/** Returns the import statement (a string) given an ImportDeclaration node and ESLint context */
module.exports.getImportStatement = (importDeclarationNode, context) =>
  context
    .getSourceCode()
    .getText(importDeclarationNode)
    .match(/^\s*(import\s+.+?)/)[1];

/** Returns the expected class name (based on Instawork conventions) given a path
 *  If suffixes is an array, will return an array of all expected import names with the specified
 *  suffixes. If suffixes is a string, will return the expected import name with the provided suffix
 */
module.exports.getExpectedClassName = (dir, suffixes) => {
  const camelized = humps.camelize(path.basename(dir));
  const capitalized = capitalizeString(camelized);
  if (!suffixes) {
    return capitalized;
  }

  if (suffixes.map) {
    return suffixes.map((suffix) => capitalized + suffix);
  }

  return capitalized + suffixes;
};

/** Returns the expected import name (based on Instawork conventions) given a ImportDeclaration node
 *  If suffixes is an array, will return an array of all expected import names with the specified
 *  suffixes. If suffixes is a string, will return the expected import name with the provided suffix
 */
module.exports.getExpectedImportName = (importDeclarationNode, suffixes) => {
  const importPath = importDeclarationNode.source.value;
  if (!importPath) {
    return '';
  }
  return module.exports.getExpectedClassName(importPath, suffixes);
};

/** Returns whether or not an ImportDeclaration node represents an import statement whose path
 *  matches pathRegex. Returns false for flow-type imports
 */
module.exports.isImportingPath = (importDeclarationNode, pathRegex) =>
  importDeclarationNode.source.type === 'Literal' &&
  pathRegex.test(importDeclarationNode.source.value) &&
  importDeclarationNode.importKind === 'value';

/** Returns whether or not an ImportDeclaration node is a wildcard import.
 *  If expectedNames is passed-in (array|string), it will return false unless the import name
 *  matches expectedNames
 */
module.exports.isWildcardImport = (importDeclarationNode, expectedNames) => {
  if (importDeclarationNode.specifiers.length !== 1) {
    return false;
  }
  if (importDeclarationNode.specifiers[0].type !== 'ImportNamespaceSpecifier') {
    return false;
  }
  if (!expectedNames) {
    return true;
  }

  const importName = importDeclarationNode.specifiers[0].local.name;

  if (expectedNames.includes) {
    return expectedNames.includes(importName);
  }

  return expectedNames === importName;
};

/** Returns whether or not an ImportDeclaration node is a default import.
 *  If expectedNames is passed-in (array|string), it will return false unless the import name
 *  matches expectedNames
 */
module.exports.isDefaultImport = (importDeclarationNode, expectedNames) => {
  if (importDeclarationNode.specifiers.length !== 1) {
    return false;
  }
  if (importDeclarationNode.specifiers[0].type !== 'ImportDefaultSpecifier') {
    return false;
  }
  if (!expectedNames) {
    return true;
  }

  const importName = importDeclarationNode.specifiers[0].local.name;

  if (expectedNames.includes) {
    return expectedNames.includes(importName);
  }

  return expectedNames === importName;
};

/** Returns whether or not a path points to a story file */
module.exports.isStoryPath = (filepath) =>
  !!filepath &&
  typeof filepath === 'string' &&
  !!path.basename(filepath).match(/^(.+\.)?stories.js$/i);

/** Returns the expected class name (based on Instawork conventions) given a path */
module.exports.getExpectedClassNameForPath = (filepath) => {
  const entityType = module.exports.getEntityTypeForPath(filepath);
  const isRootEntity = !!filepath.match(/(\/|^)src\/([^/]+)\/([^/]+)\/([^/]+)$/i);
  const baseClassName = capitalizeString(humps.camelize(path.basename(path.dirname(filepath))));

  return isRootEntity && entityType !== 'component'
    ? `${baseClassName}${capitalizeString(entityType)}`
    : baseClassName;
};

/** Given a filepath, returns the entity type (e.g. screen, service, navbar) */
module.exports.getEntityTypeForPath = (filepath) =>
  singularizeString(filepath.match(/(\/|^)src\/(.+?)\//i)[2]);

/** Given a filepath, returns the expected Storybook entry name */
module.exports.getExpectedStoryNameForPath = (filepath) => {
  const entityType = capitalizeString(module.exports.getEntityTypeForPath(filepath));
  const className = module.exports.getExpectedClassNameForPath(filepath);
  return `${pluralizeString(entityType)}/${className}`;
};

/** Returns whether or not an ESPrima node is a story declaration (i.e. `storiesOf(...)`) */
module.exports.isStoryDeclarationNode = (node) =>
  !!node &&
  node.type === 'CallExpression' &&
  node.callee.type === 'Identifier' &&
  node.callee.name === 'storiesOf' &&
  node.arguments.length > 0 &&
  node.arguments[0].type === 'Literal';

/** Given a story declaration node, returns the story name */
module.exports.getStoryNameForStoryDeclarationNode = (node) => node.arguments[0].value;

module.exports.getSuperclassName = (classExpressionNode) => {
  const { superClass } = classExpressionNode;
  if (!superClass) {
    return null;
  }

  if (superClass.type === 'MemberExpression') {
    return superClass.property.name;
  }
  if (superClass.type === 'Identifier') {
    return superClass.name;
  }

  throw new Error(`Unexpected superClass type: ${superClass.type}`);
};

/**
 * Returns whether or not a path points to a first-level common view index file
 * The pattern matches paths like "common/views/view-name/index.ts"
 * and rejects deeper paths like "common/views/view-name/subfolder/index.ts"
 * and rejects view components paths like "common/views/components/component-name/index.ts"
 * */
module.exports.isFirstLevelViewIndex = (filePath) => {
  const firstLevelViewIndexPattern = /\/common\/(src\/)?views\/(?!components\/)[^/]+\/index\.ts$/;
  const normalizedFilePath = filePath.replace(/\\/g, '/');
  return firstLevelViewIndexPattern.test(normalizedFilePath);
};