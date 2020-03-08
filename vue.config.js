module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  chainWebpack: (config) => {
    config.plugins.delete('preload')
    if (process.env.NODE_ENV === 'development') {}
  }
}
