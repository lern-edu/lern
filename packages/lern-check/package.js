Package.describe({
  name: 'duckdodgerbrasl:lern-check',
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
    'check',

    'duckdodgerbrasl:lern-model',
  ]);

  api.addFiles([
    'lib/Cursor.js',
    'lib/User.js',
    'lib/Regex.js',
  ]);

  api.mainModule('exporter.js');
});

Package.onTest((api) => {

  api.use([
    'ecmascript',
    'accounts-base@1.4.0',
    'accounts-password@1.5.0',
    'coffeescript@1.12.7_3',
    'practicalmeteor:mocha@2.4.5_6',
    'dispatch:phantomjs-tests@=0.0.5',
    'dispatch:mocha-phantomjs',
    'duckdodgerbrasl:lern-model',
    'duckdodgerbrasl:lern-check',
  ]);

  api.mainModule('tests.js');
});
