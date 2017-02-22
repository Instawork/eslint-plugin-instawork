module.exports = {
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    ga: false,
    google: false,
    fbq: false,
    Stripe: false,
    console: false,
    fetch: false,
    Body: false,
    Headers: false,
    Request: false,
    Response: false,
    navigator: false,
    FormData: false,
    __DEV__: false,
    __dirname: false,
    __filename: false,
    driver: false,
    process: false,
    assert: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    // Allow importing modules without specifying extension
    'import/extensions': ['error', 'never'],

    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'linebreak-style': ['error', 'unix'],
    'react/jsx-filename-extension': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/require-default-props': 'error',
    'react/jsx-no-bind': [2, {
      'ignoreRefs': false,
      'allowArrowFunctions': false,
      'allowBind': false,
    }],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  }
};
