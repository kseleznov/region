import { defineConfig, globalIgnores } from "eslint/config";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-plugin-prettier";
import reactCompiler from "eslint-plugin-react-compiler";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      prettier,
      "react-compiler": reactCompiler,
    },
    rules: {
      "prettier/prettier": "error",
      "react-compiler/react-compiler": "error",
    },
  },
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "widgets", pattern: "src/widgets/*", capture: ["slice"] },
        { type: "features", pattern: "src/features/*", capture: ["slice"] },
        { type: "entities", pattern: "src/entities/*", capture: ["slice"] },
        { type: "shared", pattern: "src/shared/**" },
      ],
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: { type: "app" },
              allow: {
                to: [
                  { type: "app" },
                  {
                    type: ["widgets", "features", "entities"],
                    internalPath: "index.ts",
                  },
                  { type: "shared" },
                ],
              },
            },
            {
              from: { type: "widgets" },
              allow: {
                to: [
                  { type: ["features", "entities"], internalPath: "index.ts" },
                  { type: "shared" },
                ],
              },
            },
            {
              from: { type: "features" },
              allow: {
                to: [
                  { type: "entities", internalPath: "index.ts" },
                  { type: "shared" },
                ],
              },
            },
            { from: { type: "entities" }, allow: { to: { type: "shared" } } },
            { from: { type: "shared" }, allow: { to: { type: "shared" } } },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
