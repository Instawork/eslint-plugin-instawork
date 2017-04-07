module.exports = {
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    mocha: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  globals: {
    __DEV__: false,
    __dirname: false,
    __filename: false,
    assert: false,
    Body: false,
    console: false,
    driver: false,
    fbq: false,
    fetch: false,
    FormData: false,
    ga: false,
    google: false,
    Headers: false,
    navigator: false,
    process: false,
    Request: false,
    Response: false,
    Stripe: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      modules: true,
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
