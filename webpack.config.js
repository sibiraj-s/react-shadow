const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const insertShadowStyles = (styleEl) => {
  const target = document.querySelector('shadow-host').shadowRoot;
  target.appendChild(styleEl);
};

const isProduction = process.env.NODE_ENV !== 'development';

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    clean: true,
    filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
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
        type: 'asset/resource',
        generator: {
          filename: isProduction ? 'images/[name]-[contenthash][ext]' : 'images/[name][ext]',
        },
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
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    port: 6673,
    historyApiFallback: true,
    hot: true,
  },
};

module.exports = webpackConfig;
