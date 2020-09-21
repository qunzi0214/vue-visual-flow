import baseConfig from './rollup.base';

export default {
  output: {
    file: 'dist/index.esm.js',
    format: 'esm'
  },
  ...baseConfig,
}