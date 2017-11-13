Package.describe({
  name: 'duckdodgerbrasl:lern-router',
  version: '0.0.1',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'kadira:flow-router',
    'duckdodgerbrasl:lern-layouts',
  ]);

  api.addFiles([
    'lib/admin.jsx',
    'lib/school.jsx',
    'lib/public.jsx',
    'lib/student.jsx',
    'lib/teacher.jsx',
  ], 'client');

  api.export('FlowRouter');
});
