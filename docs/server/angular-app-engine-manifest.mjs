
export default {
  basePath: '/inggatec/barbosaecruz',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
