var merge = require('webpack-merge')
var baseConfig = require('./base.config.js')
var Dotenv = require('dotenv-webpack')

module.exports = merge(baseConfig, {
  devtool: '#eval-source-map',
  plugins: [
    new Dotenv({
      path: './.env.dev',
      systemvars: true
    }),
    new Dotenv({
      path: './.env',
      systemvars: true
    })
  ]
})