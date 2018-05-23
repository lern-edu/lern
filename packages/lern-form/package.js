Package.describe({
  name: 'duckdodgerbrasl:lern-form',
  version: '0.0.1',
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.6');
  api.use('ecmascript');
  api.use('jagi:astronomy@2.5.2');
  api.mainModule('lern-form.js');
});

Package.onTest((api) => {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('lern-form');
  api.mainModule('lern-form-tests.js');
});
