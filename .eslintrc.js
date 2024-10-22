module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'no-console': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' },
    ],

    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^@?\\w'],
          ['^@/'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$'],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules/', '.next/', 'out/'],
};
