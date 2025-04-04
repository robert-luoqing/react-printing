import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import strip from "@rollup/plugin-strip";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { dts } from "rollup-plugin-dts";

const config = [{
  input: 'src/printing.ts',  // Your main entry file
  output: [
    {
      dir: "dist/cjs",  // Output bundle file
      format: "cjs",  // Universal Module Definition (UMD) format
      sourcemap: true,
      name: 'react-layout',  // The name of your library
      globals: {
        react: 'React', // Global variable for React
        'react-dom': 'ReactDOM', // Global variable for ReactDOM
      },

    },
    {
      dir: "dist/esm",  // Output for ESM (ES Module)
      sourcemap: true,
      format: 'esm',  // ES Module format
    },
  ],
  plugins: [
    postcss(),
    strip({ directives: ["use client"] }),
    babel({ babelHelpers: "bundled" }),
    resolve({
      browser: true, // 让 Rollup 解析 browser 版本的包
      preferBuiltins: false, // 避免使用 Node.js 内置模块
    }),
    commonjs({
      transformMixedEsModules: true,
    }),
    typescript({ tsconfig: './tsconfig.json' }),  // Use TypeScript plugin for Rollup
  ],
  external: ['react', 'react-dom'],  // Externalize React and ReactDOM (not bundled with your library)
},  {
  input: 'src/printing.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
}];

export default config;
