// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
//   tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "no-console": "warn"
    }
  }
);