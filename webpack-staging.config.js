/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

// const Dir = {
//   src: path.join(__dirname, 'src'),
// };

module.exports = {
  mode: 'production',
  entry: [
    '@babel/polyfill',
    './src/index.js',
  ],
  watch: false,
  devtool: false,
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
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/staging`,
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    libraryTarget: 'umd',
    publicPath: '/',
  },
  plugins: [
    // new CleanWebpackPlugin([Dir.build]),
    // new ExtractTextPlugin('style.css'),
    new MomentLocalesPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    // Minify CSS
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'style.[contenthash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __LOCAL__: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Komuter KTM Timetable and Schedule',
      hash: true,
      template: `${__dirname}/www/index-prod.html`,
    }),
    new CopyWebpackPlugin([
      { from: 'www/static', to: 'static' },
    ]),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          extractComments: 'all',
          compress: {
            warnings: true,
            drop_console: true,
          },
        },
      }),
    ],
  },
};
