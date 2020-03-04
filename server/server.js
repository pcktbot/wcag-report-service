require('dotenv').config()
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const models = require('./models')
const path = require('path')

config.dev = !(process.env.NODE_ENV === 'production')

require('greenlock-express')
  .init({
    packageRoot: path.resolve(__dirname, '..'),
    configDir: '../greenlock.d',
    maintainerEmail: 'david.miller@getg5.com',
    cluster: false
  })
  .ready(async (glx) => {
    const app = require('./express.js')
    const nuxt = new Nuxt(config)

    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } else {
      await nuxt.ready()
    }
    app.use(nuxt.render)
    models.sequelize.sync().then(() => glx.serveApp(app))
  })
