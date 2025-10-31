
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/barbosaecruz/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/barbosaecruz"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 27994, hash: 'bee1dcbe22114ce7c23d77f6f315200e8dfb69a1769c233b09934dc28568bb9e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17153, hash: '9e98f71596434841de1053dda1dd144e04cb1b50a8788e671f25398aed436c25', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 65454, hash: '49ea047bb91f9458bea9602ab8c7cf384ede402b2af572ac8c29bf8217f855c4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-OBQTMA3M.css': {size: 237944, hash: 'LnfsZC6fqY0', text: () => import('./assets-chunks/styles-OBQTMA3M_css.mjs').then(m => m.default)}
  },
};
