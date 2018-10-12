const path = require('path');
module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: path.join(__dirname, 'app', 'app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    inline: true,
    port: 3001
  },
  module: {
    rules: [{
      test: /¥.jsx?$/,
      use: {
        loader: 'bable-loader'
      },
      exclude: /node_modules/
    }]
  }
};