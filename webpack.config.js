const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/app/app.js',

  output: {
    path: __dirname + '/build',
    filename: 'app-[hash].js'
  },

  devtool: 'evel-source-map',
  
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true,
    hot: true
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }, {
      test: /\.(sass|scss|css)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: [/\.bmp$/, /\.gif/, /\.jpe?g/, /\.png$/],
      use: {
        loader: 'file-loader'
      }
    }]
  },

  plugins: [
    new webpack.BannerPlugin('Written by Okato.'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.temp.html",
      children: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
}