module.exports = {
  extends: ['@geolonia', 'react-app', 'plugin:react/recommended', 'plugin:storybook/recommended'],
  env: {
    browser: true,
    jest: true
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': ['**/*.stories.tsx', '**/*.test.tsx', '*.config.js']
    }]
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  overrides: [{
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off'
    }
  }]
};
