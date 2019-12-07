const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function insertShadowStyles (styleEl) {
  const target = document.querySelector('shadow-host').shadowRoot;
  target.appendChild(styleEl);
}

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
        test: /app.scss/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: insertShadowStyles,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(s)?css$/,
        exclude: /app.scss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.svg$/i,
        use: 'file-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico')
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV
    }),
    new webpack.ProgressPlugin()
  ]
};
