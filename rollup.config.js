import resolve from 'rollup-plugin-node-resolve'; // 用来让rollup支持像node的一样通过模块名加载第三方模块
import commonjs from 'rollup-plugin-commonjs'; // rollup只能解析ES模块，该插件用来让rollup能够解析 CommonJS模块
import babel from "rollup-plugin-babel"; // 编译es6为es5
import { terser } from 'rollup-plugin-terser'; // 压缩代码
import ts from 'rollup-plugin-typescript2';
import packageJSON from './package.json';
import { eslint } from 'rollup-plugin-eslint' // eslint插件

const { preserveShebangs } = require('rollup-plugin-preserve-shebangs'); // rollup 无法识别 #!/usr/bin/env node 文件，该插件用来解决这个问题

const path = require('path');
const getPath = _path => path.resolve(__dirname, _path);
const isDev = process.env.NODE_ENV !== 'production';

const extensions = [
  '.js',
  '.ts',
]

// eslint
const esPlugin = eslint({
  throwOnError: true,
  include: ['src/**/*.ts'],
  exclude: ['node_modules/**', 'lib/**']
})

// ts
const tsPlugin = ts({
  tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
  extensions,
  tsconfigOverride: {
    compilerOptions: {
      module: 'ES2015'
    }
  }
})

// 基础配置
const config = {
  input: getPath('./src/index.ts'),
  output: [{
    file: packageJSON.main, // 通用模块
    format: 'umd',
  }],
  plugins:[
    resolve(extensions),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
    }),
    tsPlugin,
    esPlugin,
    preserveShebangs(),
    !isDev && terser()
  ]
}

export default config;
