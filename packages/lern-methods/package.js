Package.describe({
  name: 'duckdodgerbrasl:lern-methods',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.6');

  api.use([
    'ecmascript',
    'duckdodgerbrasl:lern-check',
    'duckdodgerbrasl:lern-model',
  ]);

  api.addFiles([
    'helpers.js',

    'server/admin/admin.js',
    // 'server/school/school.js',
    'server/user/user.js',

    // 'server/teacher/teacher.js',
    // 'server/public/public.js',
    // 'server/student/answer.js',
    // 'server/student/attempt.js',
    // 'server/student/profile.js',
    // 'server/student/test.js',
  ], 'server');
});
