module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    "prettier"
  ],
  rules: {},
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
};
