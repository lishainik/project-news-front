/* eslint-disable global-require */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const isDevelop = process.env.NODE.ENV === 'development';

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/js/index.js'),
    articles: path.resolve(__dirname, 'src/js/articles/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
        use: [
          { loader: 'file-loader?name=./images/[name].[ext]' },
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          isDevelop
            ? 'style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(ept|ttf|woff|woff2)$/i,
        use: { loader: 'file-loader?name=./vendor/[name].[ext]' },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/style.[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/i,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/articles.html',
      filename: 'articles.html',
      chunks: ['articles'],
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
// module.exports = {
//   entry: {},
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js',
//   },
//   module: {
//     rules: [{
//       test: /\.js$/,
//       use: { loader: 'babel-loader' },
//       exclude: /node_modules/,
//     },
//     {
//       test: /\.css$/,
//       use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
//     },
//     ],
//   },
//   plugins: [
//     new MiniCssExtractPlugin({ filename: 'style.css' }),
//     new HtmlWebpackPlugin({ // настроили плагин
//       inject: false,
//       template: './src/index.html',
//       filename: 'index.html',
//     }),
//     new WebpackMd5Hash(),
//   ],
// };
