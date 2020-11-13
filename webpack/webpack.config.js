const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const config = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:6].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static')
      }
    ]),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/vendor.manifest.json')
    }),
    new CleanWebpackPlugin(),
  ]
}

// 是否开启webpack-bundle-analyzer
if (process.env.config_report) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
