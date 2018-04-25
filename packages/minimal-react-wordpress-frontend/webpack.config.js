const { resolve } = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProd = process.env.NODE_ENV === 'production'
const prodUrl = ''

module.exports = {
  entry: isProd
    ? [
      'babel-polyfill',
      'react',
      'react-dom',
      './app/main.js',
    ]
    : [
      'babel-polyfill',
      'react-hot-loader/patch',
      './app/main.js',
    ],
  output: {
    filename: isProd ? 'js/[name].[hash].js' : 'js/bundle.js',
    path: resolve(__dirname, 'dist'),

    // Path of output bundle relative to HTML file, necessary for live editing
    publicPath: isProd ? prodUrl : '/',
  },
  devServer: {
    // Respond to 404s with index.html
    historyApiFallback: true,

    // Location of static assets (e.g. HTML file)
    contentBase: resolve(__dirname, 'dist'),

    // Must be the same as output.publicPath, necessary for live editing
    publicPath: isProd ? prodUrl : '/',
  },

  // Solution for request/request-promise issue
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  devtool: isProd ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolve(__dirname, 'app'),
          ...(isProd ? [
            resolve(__dirname, 'node_modules/strict-uri-encode'),
            resolve(__dirname, 'node_modules/query-string'),
          ] : []),
        ],
        loader: 'babel-loader',
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'app': resolve(__dirname, 'app'),
    },
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, 'dist/index.html'),
      template: resolve(__dirname, 'app/index.html'),
    }),
    ...(isProd
      ? [
        new BundleAnalyzerPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyJsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
      ]
      : []),
  ],
}
