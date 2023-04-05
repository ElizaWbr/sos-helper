const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {},
    cordovaPath: 'src-cordova'
  },

  publicPath: ''
})
