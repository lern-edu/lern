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
    'server/user/user.js',
  ], 'server');
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
    'duckdodgerbrasl:lern-check',
    'duckdodgerbrasl:lern-methods',
  ]);

  api.mainModule('tests.js');
});
