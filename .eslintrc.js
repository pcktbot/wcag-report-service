module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  rules: {
    'nuxt/no-cjs-in-config': 1,
    "vue/comment-directive": 0,
    curly: 0,
    camelcase: ['warn', { properties: 'never', ignoreDestructuring: true }]
  }
}