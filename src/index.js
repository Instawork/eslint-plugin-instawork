import * as recommended from './config/recommended';
import * as componentMethodsUseArrows from './rules/component-methods-use-arrows';
import * as deprecateBound from './rules/deprecate-bound';
import * as deprecateComponents from './rules/deprecate-components';
import * as deprecateImports from './rules/deprecate-imports';
import * as deprecateStateless from './rules/deprecate-stateless';
import * as exactObjectTypes from './rules/exact-object-types';
import * as flowAnnotate from './rules/flow-annotate';
import * as importComponents from './rules/import-components';
import * as importModules from './rules/import-modules';
import * as importNavbar from './rules/import-navbar';
import * as importOverlays from './rules/import-overlays';
import * as importResources from './rules/import-resources';
import * as importScreens from './rules/import-screens';
import * as importServices from './rules/import-services';
import * as localizationNamespace from './rules/localization-namespace';
import * as localizationStringKey from './rules/localization-string-key';
import * as namingComponents from './rules/naming-components';
import * as namingOverlays from './rules/naming-overlays';
import * as namingScreens from './rules/naming-screens';
import * as propsNoFunction from './rules/props-no-function';
import * as pureComponents from './rules/pure-components';
import * as reduxTypeSelectors from './rules/redux-type-selectors';
import * as requireTracking from './rules/require-tracking';
import * as screenActionsPropsReturnAction from './rules/screen-actions-props-return-action';
import * as screenActionsPropsFunction from './rules/screen-actions-props-function';
import * as screenSelectorsPropsFunction from './rules/screen-selectors-props-function';
import * as storiesComponents from './rules/stories-components';
import * as storiesName from './rules/stories-name';
import * as storiesNavbars from './rules/stories-navbars';
import * as storiesScreens from './rules/stories-screens';

const configs = {
  recommended,
};

const rules = {
  'component-methods-use-arrows': componentMethodsUseArrows,
  'deprecate-bound': deprecateBound,
  'deprecate-components': deprecateComponents,
  'deprecate-imports': deprecateImports,
  'deprecate-stateless': deprecateStateless,
  'exact-object-types': exactObjectTypes,
  'flow-annotate': flowAnnotate,
  'import-components': importComponents,
  'import-modules': importModules,
  'import-navbar': importNavbar,
  'import-overlays': importOverlays,
  'import-resources': importResources,
  'import-screens': importScreens,
  'import-services': importServices,
  'localization-namespace': localizationNamespace,
  'localization-string-key': localizationStringKey,
  'naming-components': namingComponents,
  'naming-overlays': namingOverlays,
  'naming-screens': namingScreens,
  'props-no-function': propsNoFunction,
  'pure-components': pureComponents,
  'redux-type-selectors': reduxTypeSelectors,
  'require-tracking': requireTracking,
  'screen-actions-props-return-action': screenActionsPropsReturnAction,
  'screen-actions-props-function': screenActionsPropsFunction,
  'screen-selectors-props-function': screenSelectorsPropsFunction,
  'stories-components': storiesComponents,
  'stories-name': storiesName,
  'stories-navbars': storiesNavbars,
  'stories-screens': storiesScreens,
};

module.exports = { configs, rules };
