const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const pkgJson = require('./package.json');

const insertShadowStyles = (styleEl) => {
  const target = document.querySelector('shadow-host').shadowRoot;
  target.appendChild(styleEl);
};

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(?:node_modules|bower_components)/,
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
        test: /\.s[ac]ss$/i,
        exclude: /app.scss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.ico'),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    new webpack.ProgressPlugin(),
  ],
  devServer: {
    port: 6673,
    historyApiFallback: true,
    hot: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.output.publicPath = `/${pkgJson.name}/`;
}

module.exports = webpackConfig;
