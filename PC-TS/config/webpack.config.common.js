const path = require('path')
const appSrc = path.resolve(__dirname, '../src')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: {
    app: appSrc + '/index.tsx'
  },
  resolve: {
    extensions: [".ts", ".tsx", '.js', '.json', '.css', '.scss'], //添加在此的后缀所对应的文件可以省略后缀
    alias: {
      '@config': path.resolve(__dirname, '../src/config'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@layouts': path.resolve(__dirname, '../src/layouts'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@views': path.resolve(__dirname, '../src/views')
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../tsconfig.json')})
    ]
  },
  module: {
    rules: [
      { test: /\.ts[x]?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.ts[x]$/, loader: "source-map-loader" },
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appSrc + '/index.html',
      filename: 'index.html'
    }),
    new CheckerPlugin()
  ]
}