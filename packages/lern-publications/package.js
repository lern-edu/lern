Package.describe({
  name: 'duckdodgerbrasl:lern-publications',
  version: '0.0.1',

  // Brief, one-line summary of the package.
  summary: '',

  // URL to the Git repository containing the source code for this package.
  git: '',

  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.6');
  api.use([
    'ecmascript',

    'duckdodgerbrasl:lern-check',
    'duckdodgerbrasl:lern-model',
  ]);

  api.addFiles([
    'helpers.js',
    'lib/user.js',
  ], 'server');
});

Package.onTest((api) => {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('duckdodgerbrasl:lern-publications');
  api.mainModule('lern-publications-tests.js');
});
