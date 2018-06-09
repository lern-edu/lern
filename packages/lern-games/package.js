Package.describe({
  name: 'duckdodgerbrasl:lern-games',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.mainModule('lern-games.js');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('duckdodgerbrasl:lern-games');
  api.mainModule('lern-games-tests.js');
});
