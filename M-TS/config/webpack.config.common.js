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
      '@src': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '..src/pages'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@api': path.resolve(__dirname, '../src/api'),
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../tsconfig.json')})
    ]
  },
  module: {
    rules: [
      { 
        test: /\.ts[x]?$/, 
        // loader: "awesome-typescript-loader" 
        use: [
          'awesome-typescript-loader',
          {
            loader: 'ui-component-loader',
            options: {
              'lib': 'antd-mobile',
              'camel2': '-',
              'style': 'style/index.css',
            }
          }
        ]
      },
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
    })
  ]
}