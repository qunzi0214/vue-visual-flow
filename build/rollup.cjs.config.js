import baseConfig from './rollup.base';

export default {
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    exports: 'named'
  },
  ...baseConfig,
}