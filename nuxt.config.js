export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-nuxt-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
      },
    ],
  },

  server: {
    port: 8080,
  },

  router: {
    trailingSlash: true,
    // prefetchLinks: false, // отключаем предзагрузку nuxt-link для всего проекта
    // linkActiveClass: 'active',
    // linkExactActiveClass: 'active-exact',
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     path: '*',
    //     component: resolve(__dirname, 'pages/index.vue'),
    //   })
    // },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/core-components.js', '~/plugins/date-filter.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/redirect-module
    '@nuxtjs/redirect-module',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: false,
    baseURL:
      process.env.BASE_URL ||
      'https://my-nuxt-app-dae70-default-rtdb.europe-west1.firebasedatabase.app',
  },

  redirect: [
    {
      from: '^(?!.*\\?).*(?<!\\/)$',
      to: (from, req) => {
        return req.url + '/'
      },
    },
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
  },

  loading: {
    color: '#fa923f',
    height: '4px',
    duration: 5000,
  },
  loadingIndicator: {
    name: 'circle',
    color: '#fa923f',
  },
  dev: {},
  env: {
    baseUrl:
      process.env.BASE_URL ||
      'https://my-nuxt-app-dae70-default-rtdb.europe-west1.firebasedatabase.app',
  },
  // generate: {},
  transition: {
    name: 'fade',
    mode: 'out-in',
  },
}
