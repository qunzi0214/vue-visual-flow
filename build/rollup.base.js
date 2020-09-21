import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',

  plugins: [
    vue({ css: true }),

    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),

    nodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),

    commonjs(),

    image(),
  ],
  external: id => {
    return /^lodash/.test(id)
      || /^@antv\/g6/.test(id)
      || /^@antv\/util/.test(id);
  }
}