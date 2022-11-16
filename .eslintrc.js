module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'max-len': [
      'error',
      {
        ignoreUrls: true,
        code: 140,
        ignorePattern: '^import |//',
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'max-classes-per-file': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'no-undef': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'operator-linebreak': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'prefer-destructuring': 'off',
    'padded-blocks': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts'] }],
    'lines-between-class-members': 'off',
    'prefer-const': 'warn',
    'no-empty': 'warn',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
  },
  ignorePatterns: ['**/geodesy/**/*.*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  overrides: [
    {
      files: ['./src/*.ts'],
    },
  ],
};
