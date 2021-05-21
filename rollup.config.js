import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const tsconfigOverride = {
  exclude: [
    'node_modules',
    'dist',
    'coverage',
    'src/**/*.test.ts',
    'src/**/*.test.tsx',
    'src/**/*.test.js',
    'src/**/*.test.jsx',
    '*.config.*',
    'setupTests.ts',
  ],
};

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.module, format: 'esm', sourcemap: true },
    { file: pkg.main, format: 'cjs', sourcemap: true },
  ],
  external: [...Object.keys(pkg.peerDependencies)],
  plugins: [
    typescript({ tsconfigOverride }),
    terser({ format: { comments: false } }),
  ],
};
