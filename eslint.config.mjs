import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        'devDependencies': ['**/*.stories.tsx', '**/*.test.tsx', '*.config.js']
      }]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
