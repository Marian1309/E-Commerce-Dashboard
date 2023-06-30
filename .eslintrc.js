module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'next'
  ],
  rules: {
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'no-console': 'warn',

    'consistent-return': 'off',

    'linebreak-style': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 'off',
    'no-unused-vars': 'off',
    'arrow-body-style': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'jsx-quotes': 'off',
    'no-undef': 'off',
    'react/require-default-props': 'off',
    'object-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'import/order': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/no-array-index-key': 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-use-before-define': 'off',
    indent: 'off',
    'jsx-a11y/heading-has-content': 'off'
  },
  globals: {
    process: true,
    module: true,
    require: true
  },
  ignorePatterns: [
    'node_modules',
    '.next',
    'build',
    'dist',
    'out',
    '.env*.local',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock'
  ]
};
