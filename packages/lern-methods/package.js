Package.describe({
  name: 'duckdodgerbrasl:lern-methods',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'erasaur:meteor-lodash',
    'renaldo:youtube-api',

    'lsunsi:se-fetch',
    'lsunsi:se-check',
  ]);

  api.addFiles([
    'helpers.js',

    'server/admin/admin.js',
    'server/school/school.js',
    'server/user/user.js',
    'server/teacher.js',
    'server/public.js',
    'server/student/answer.js',
    'server/student/attempt.js',
    'server/student/profile.js',
    'server/student/test.js',
  ], 'server');
});
