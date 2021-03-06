const path = require('path')
const resolve = _path => path.resolve(__dirname, _path)
const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module']


module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser', // 配置ts解析器
  parserOptions: {
    project: resolve('./tsconfig.json'), 
    tsconfigRootDir: resolve('./'),
    sourceType: 'module'
  },
  // plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'error',
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    'no-console': 'off',
  },
  ignorePatterns: ['rollup.config.js', 'lib/index.js'], // 配置忽略eslint的文件
};