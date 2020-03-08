const path = require('path')
const appSrc = path.resolve(__dirname, '../src')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: appSrc + '/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '..src/pages'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@styles': path.resolve(__dirname, '../src/styles'),
    }
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appSrc + '/index.html',
      filename: 'index.html'
    })
  ]
}