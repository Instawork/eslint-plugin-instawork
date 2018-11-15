const configs = {
  recommended: require('./config/recommended'),
};

const rules = {
  'component-methods-use-arrows': require('./rules/component-methods-use-arrows'),
  'deprecate-bound': require('./rules/deprecate-bound'),
  'deprecate-components': require('./rules/deprecate-components'),
  'deprecate-imports': require('./rules/deprecate-imports'),
  'deprecate-stateless': require('./rules/deprecate-stateless'),
  'exact-object-types': require('./rules/exact-object-types'),
  'flow-annotate': require('./rules/flow-annotate'),
  'import-components': require('./rules/import-components'),
  'import-modules': require('./rules/import-modules'),
  'import-navbar': require('./rules/import-navbar'),
  'import-overlays': require('./rules/import-overlays'),
  'import-resources': require('./rules/import-resources'),
  'import-screens': require('./rules/import-screens'),
  'import-services': require('./rules/import-services'),
  'localization-namespace': require('./rules/localization-namespace'),
  'localization-string-key': require('./rules/localization-string-key'),
  'naming-components': require('./rules/naming-components'),
  'naming-overlays': require('./rules/naming-overlays'),
  'naming-screens': require('./rules/naming-screens'),
  'props-no-function': require('./rules/props-no-function'),
  'pure-components': require('./rules/pure-components'),
  'redux-type-selectors': require('./rules/redux-type-selectors'),
  'screen-actions-props-return-action': require('./rules/screen-actions-props-return-action'),
  'screen-actions-props-function': require('./rules/screen-actions-props-function'),
  'screen-selectors-props-function': require('./rules/screen-selectors-props-function'),
  'stories-components': require('./rules/stories-components'),
  'stories-name': require('./rules/stories-name'),
  'stories-navbars': require('./rules/stories-navbars'),
  'stories-screens': require('./rules/stories-screens'),
};

module.exports = { configs, rules };
