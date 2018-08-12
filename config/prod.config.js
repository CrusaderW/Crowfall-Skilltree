var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./base.config.js')
var Dotenv = require('dotenv-webpack')

module.exports = merge(baseConfig, {
  devtool: '#source-map',
  plugins: [
    new Dotenv({
      path: './.env.prod',
      systemvars: true
    }),
    new Dotenv({
      path: './.env',
      systemvars: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})