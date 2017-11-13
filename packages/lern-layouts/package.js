Package.describe({
  name: 'duckdodgerbrasl:lern-layouts',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'universe:i18n',
    'react-meteor-data',
  ], 'client');

  api.addFiles([
    'components/Navigation.jsx',
    'components/Safe.jsx',
    'components/Snackbar.jsx',

    'mixins/Screen.jsx',

    'Layout.jsx',
    'Container.jsx',
    'Setup.jsx',
    'NotFound.jsx',
    'Bar.jsx',
  ], 'client');

  api.mainModule('./exporter.js', 'client');
  api.export('Layout');
});
