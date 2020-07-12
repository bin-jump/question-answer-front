const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'production',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
    port: 3000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
