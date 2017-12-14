/**
 * @memberof LernHead
 * @desc Import all head meta tags
 */
const metas = [
  { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
  { name: 'theme-color', content: '#0066cc' },
];

metas.forEach(meta => DocHead.addMeta(meta));
