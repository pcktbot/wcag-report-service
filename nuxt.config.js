require('dotenv').config()
module.exports = {
  mode: 'spa',
  server: {
    host: process.env.BASE_URL || '0.0.0.0',
    port: process.env.PORT || 8085
  },
  head: {
    title: 'Accessibility Report',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  loading: { color: '#21222e' },
  loadingIndicator: {
    name: 'three-bounce',
    color: '#21222e',
    background: '#f2f2f2'
  },
  css: ['~/assets/theme.scss'],
  plugins: [
    '~/plugins/apex-chart.js',
    '~/plugins/smooth-scroll.js'
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: '',
    debug: {
      enabled: false,
      sendHitTask: true
    }
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    config: {}
  },
  axios: { browserBaseURL: `//${process.env.BROWSER_URL}` },
  build: {
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient
          ? 'source-map'
          : 'inline-source-map'
      }
    }
  }
}
