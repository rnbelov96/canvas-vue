module.exports = {
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
  extends: ['airbnb-base', 'plugin:vue/vue3-recommended'],
  rules: {
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-new': 0,
    'arrow-parens': 0,
    'max-len': 0,
    'no-console': ['error', { allow: ['error'] }],
    'no-param-reassign': 0,
    'arrow-body-style': 0,
    'func-names': 0,
    'import/prefer-default-export': 0,
  },
};
