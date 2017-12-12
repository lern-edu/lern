Package.describe({
  name: 'duckdodgerbrasl:lern-layouts',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.6');

  api.use([
    'ecmascript',
    'universe:i18n',
    'react-meteor-data',

    'duckdodgerbrasl:lern-model',
    'duckdodgerbrasl:lern-publications',
  ], 'client');

  api.addFiles([
    'components/Navigation.jsx',
    'components/Safe.jsx',
    'components/Snackbar.jsx',

    'mixins/Screen.jsx',

    'Layout.jsx',
    'Container.jsx',
    'NotFound.jsx',
    'Bar.jsx',
    'Setup.jsx',
  ], 'client');

  api.mainModule('./exporter.js', 'client');
});
