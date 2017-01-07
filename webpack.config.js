'use strict'

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const BUILDING = process.env.npm_lifecycle_event === 'build'

module.exports = (function makeWebpackConfig () {
  let entry = []
  entry.push('react-hot-loader/patch')

  if (!BUILDING) {
    entry.push(
      'webpack-dev-server/client?http://localhost:7000',
      'webpack/hot/only-dev-server'
    )
  }

  entry.push('./main.jsx')

  let config = {
    entry: entry,
    devServer: {
      hot: true,
      port: 7000,
      historyApiFallback: true,
      contentBase: './public/'
    },
    devtool: BUILDING ? 'cheap-module-source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    output: {
      path: root('dist'),
      filename: BUILDING ? 'js/[name].[hash].js' : 'js/[name].js',
      chunkFilename: BUILDING ? '[id].[hash].chunk.js' : '[id].chunk.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV)
        }
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        chunksSortMode: 'dependency'
      })
    ]
  }

  if (BUILDING) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([{
        from: root('public')
      }])
    )
  }

  return config
})()

// Helpers
function root (args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [__dirname].concat(args))
}
