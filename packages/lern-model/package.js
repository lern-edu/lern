Package.describe({
  name: 'duckdodgerbrasl:lern-model',
  version: '0.0.1',

  // Brief, one-line summary of the package.
  summary: 'Mongo model definitions',

  // URL to the Git repository containing the source code for this package.
  git: '',

  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.6');

  api.use('ecmascript'),
  api.use('jagi:astronomy@2.5.2');
  api.use('jagi:astronomy-timestamp-behavior@2.0.0');

  api.addFiles([
    'regex.js',

    'collections/static.js',

    'validators/regex.js',
    'validators/content.js',
    'validators/date.js',
    'validators/string.js',
    'validators/float.js',
    'validators/integer.js',
    'validators/oneof.js',
    'validators/someof.js',
    'validators/reference.js',
    'validators/tags.js',

    'behaviors/author.js',

    'schemas/content/schema.js',
    'schemas/content/template/Create/index.jsx',

    'collections/users/validators.js',
    'collections/users/templates.jsx',
    'collections/users/schema.js',

    'collections/companies/schema.js',

    'collections/tags/schema.js',
    'collections/tags/templates.jsx',
  ]);

  api.mainModule('./exporter.js');

});

Package.onTest((api) => {

  api.use([
    'ecmascript',
    'accounts-base@1.4.0',
    'accounts-password@1.5.0',
    'xolvio:cleaner@0.3.1',
    'coffeescript@1.12.7_3',
    'practicalmeteor:mocha@2.4.5_6',
    'practicalmeteor:sinon@1.14.1_2',
    'dispatch:phantomjs-tests@=0.0.5',
    'dispatch:mocha-phantomjs',
    'duckdodgerbrasl:lern-model',
  ]);

  api.mainModule('tests.js');
});
