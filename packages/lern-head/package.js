/**
 * lern-head
 * @namespace
 */
const LernHead = {};

/**
 * @memberof LernHead
 * @desc Self description - all head HTML tags are here. See more [here]{@link https://github.com/kadirahq/meteor-dochead}.
 */
function DocHead() {};

Package.describe({
  name: 'duckdodgerbrasl:lern-head',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.6');

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
