const path = require('path')
const webpack = require('webpack')

export default (webpackConfig) => {
  webpackConfig.devtool = 'cheap-module-source-map'

  webpackConfig.devServer = {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    hot: true,
    lazy: false, 
    contentBase: "../assets/"
  }

  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  return webpackConfig
}
