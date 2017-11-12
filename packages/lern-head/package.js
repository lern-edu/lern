Package.describe({
  name: 'duckdodgerbrasl:lern-head',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'kadira:dochead',
  ], 'client');

  api.addFiles([
    'client/title.js',
    'client/metas.js',
    'client/links.js',
  ], 'client');

  api.export('DocHead', 'client');
});
