/**
 * @memberof LernHead
 * @desc Import all head links tags
 */
const links = [
  { rel: 'stylesheet', href: '/iconfont/material-icons.css' },
  { rel: 'stylesheet', type: 'text/css', href: '/fonts/fonts.css' },
  { rel: 'stylesheet', type: 'text/css', href: '/rich-editor/style.css' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/apple-touch-icon.png' },
  { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/assets/favicon-32x32.png' },
  { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/assets/favicon-16x16.png' },
  { rel: 'manifest', href: '/assets/manifest.json' },
  { rel: 'mask-icon', href: '/assets/safari-pinned-tab.svg', colors: '#0066cc' },
];

links.forEach(link => DocHead.addLink(link));
