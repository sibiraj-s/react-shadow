const path = require('path');
const dartSass = require('sass');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.m?js(x)?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /\.(s)?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              /* eslint-disable-next-line object-shorthand, func-names */
              insertInto: function () {
                return document.querySelector('shadow-host').shadowRoot;
              },
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: dartSass,
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Shadow',
      favicon: path.resolve(__dirname, 'src/favicon.ico')
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV
    })
  ]
};
