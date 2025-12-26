import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  // Next.js recommended rules
  ...nextVitals,
  ...nextTs,

  // Disable ESLint rules that conflict with Prettier
  prettierConfig,

  // Enable Prettier as an ESLint rule
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Override default ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
