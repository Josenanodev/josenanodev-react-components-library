import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import postcss from "rollup-plugin-postcss";

import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: {
      file: packageJson.main,
      format: "cjs",
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: true,
          declarationDir: "dist/cjs/types",
          emitDeclarationOnly: false,
        },
      }),
      postcss({
        plugins: [],
      }),
      terser(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: packageJson.module,
      format: "esm",
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: true,
          declarationDir: "dist/esm/types",
          emitDeclarationOnly: false,
        },
      }),
      postcss({
        plugins: [],
      }),
      terser(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
