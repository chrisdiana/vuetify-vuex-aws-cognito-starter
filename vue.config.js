module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  chainWebpack: (config) => {
    config.plugins.delete('preload')
    if (process.env.NODE_ENV === 'development') {
    }
  }
}
