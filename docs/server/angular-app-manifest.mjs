
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/inggatec/barbosaecruz',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/inggatec/barbosaecruz"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28002, hash: '2e3df65107f3b0b024b3115195d22e80a6553e3441411454ef7f654a59aa8364', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17161, hash: '927cfcdb80b90a2ff045f8cebae2ed1cdff83ce5f9b3ad49132fe1856210328f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 65462, hash: '1d8e80f7d7f784dbd469a5600a504373ec080976ed789ab29b4939e1db9d60dd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-OBQTMA3M.css': {size: 237944, hash: 'LnfsZC6fqY0', text: () => import('./assets-chunks/styles-OBQTMA3M_css.mjs').then(m => m.default)}
  },
};
