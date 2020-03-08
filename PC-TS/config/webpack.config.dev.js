const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const appSrc = path.resolve(__dirname, '../src')

module.exports = merge(common, {
  mode: 'production',
  devtool: "source-map",
  // 出口
  output: {
    pathinfo: true,
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    // chunk名称配置
    chunkFilename: '[name].chunk.js',
    // 输出的文件名配置
    filename: 'bundle.js',
    sourceMapFilename: '[name].chunk.map.js'
  },
  module: {
    rules: [
      {
        test: /\.html/,
        use: [{
          loader: 'html-loader'
        }]
      }, 
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: appSrc,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      // 针对静态文件
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/[name].[hash:8].[ext]',
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader', // translates CSS into CommonJS
          }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true,
            }
          }]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      }
    ]
  },
  devServer: {
    // HOST
    host: '0.0.0.0',
    // 端口
    port: 7778,
    // 报错提示在网页遮罩层
    overlay: true,
    // 显示运行进度
    progress: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://feedback-dev.hupu.com',
    //     pathRewrite: {'^/api' : ''},
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  }
})
