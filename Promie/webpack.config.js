var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "promise",
      filename: "index.html",
      hash: true,
      cache: true,
      showErrors: true,
      chunks: ["vendor", "main"]
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9999,
    hot: true
  }
};
