// webpack.config.js
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader"
        ]
      },
      { test: /\.hbs$/, loader: "handlebars-loader" }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.hbs'
    }),
    new MiniCssExtractPlugin()
  ],
}