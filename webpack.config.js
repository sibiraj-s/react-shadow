import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const isProduction = process.env.NODE_ENV !== 'development';

const insertShadowStyles = (styleEl) => {
  const target = document.querySelector('shadow-host').shadowRoot;
  target.appendChild(styleEl);
};

const config = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    clean: true,
    filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: 'auto',
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
      template: './src/index.html',
      favicon: './src/favicon.ico',
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
          maxSize: 240000, // 240kb
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

export default config;
