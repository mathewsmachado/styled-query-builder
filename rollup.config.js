import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.module, format: 'esm' },
    { file: pkg.main, format: 'cjs' },
  ],
  external: [...Object.keys(pkg.peerDependencies)],
  plugins: [
    typescript({
      tsconfigOverride: { exclude: ['docs', 'jest.*', 'rollup.*'] },
    }),
    terser({ format: { comments: false } }),
  ],
};
