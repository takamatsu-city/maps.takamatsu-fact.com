import globals from "globals";
import react from 'eslint-plugin-react';
import reactApp from 'eslint-config-react-app';
import pluginImport from 'eslint-plugin-import';
import geolonia from '@geolonia/eslint-config';
import tsParser from '@typescript-eslint/parser';


// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
		files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      '**/dist/*',
      '**/node_modules/*',
      '*/babel.config.js'
    ],
    plugins: {
      react,
      reactApp,
      pluginImport,
      geolonia,
      tsParser
    },
    rules: {
      'pluginImport/no-extraneous-dependencies': ['error', {
        'devDependencies': ['**/*.stories.tsx', '**/*.test.tsx', '*.config.js']
      }],
      'no-console': ['error', { allow: ['warn', 'error'] }]
    },
		languageOptions: {
			globals: {
				...globals.browser
			},
      parser: tsParser
		},
	}
];
