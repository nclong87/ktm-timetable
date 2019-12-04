/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Dir = {
  src: path.join(__dirname, 'src'),
};

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
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
    path: `${__dirname}/staging`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    // new CleanWebpackPlugin([Dir.build]),
    // new ExtractTextPlugin('style.css'),
    // Minify JS
    new UglifyJSPlugin({
      sourceMap: false,
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      __LOCAL__: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Komuter KTM Timetable and Schedule',
      hash: true,
      template: `${__dirname}/www/index.html`,
    }),
    new CopyWebpackPlugin([
      { from: 'www/static', to: 'static' },
    ]),
  ],
};
