import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [{
      file: pkg.browser_umd,
      format: "umd",
      name: "jsonparse",
    },
    {
      file: pkg.browser_es6,
      format: "es",
      name: "jsonparse",
    },
  ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: "es2017",
          },
        },
      }),
    ],
  },
];
