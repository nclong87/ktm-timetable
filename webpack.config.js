const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    path: `${__dirname}/www`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __LOCAL__: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Komuter KTM Timetable and Schedule',
      hash: true,
      template: `${__dirname}/www/local.index.html`,
    }),
  ],
  devServer: {
    contentBase: './www',
    hot: true,
  },
};
