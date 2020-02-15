/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const Dir = {
  src: path.join(__dirname, 'src'),
};

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/index.js',
  ],
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            plugins: ['react-hot-loader/babel'],
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(css|sass|less)?$/,
        loader: 'style-loader',
      },
      {
        test: /\.(css|sass|less)?$/,
        loader: 'css-loader',
        options: { sourceMap: true },
        include: Dir.src,
      },
      {
        test: /\.less?$/,
        loader: 'less-loader',
        options: { sourceMap: true },
        include: Dir.src,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/www`,
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: ['es6-promise', 'Promise'],
      fetch: ['whatwg-fetch', 'fetch'],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __LOCAL__: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Komuter KTM Timetable and Schedule',
      hash: false,
      template: `${__dirname}/www/index.html`,
    }),
  ],
};
