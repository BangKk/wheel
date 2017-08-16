var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {
  context: __dirname + "/src",
  entry: {
    main: './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname + '/build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: ['url-loader']
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "swiper",
      filename: "index.html",
      template: 'index.ejs',
      hash: true,
      cache: true,
      showErrors: true,
      chunks: ["main"]
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9999,
    hot: true,
  },
  devtool: "source-map"
}

module.exports = config;
