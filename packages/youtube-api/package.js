Package.describe({
  name: 'duckdodgerbrasl:youtube-api',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.6');
  api.use([
    'ecmascript',
    'renaldo:youtube-api',

    'duckdodgerbrasl:lern-methods',
  ]);

  api.addFiles([
    'init.js',
    'lib/regex.js',
    'lib/youtube-api.js',
  ]);

  api.export('Youtube', 'client');
});
