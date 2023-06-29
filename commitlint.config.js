module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'body-max-line-length': [2, 'always', 100],
    'subject-empty': [0, 'never'],
    'type-empty': [0, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'config',
        'update',
        'project-start'
      ]
    ]
  }
};
