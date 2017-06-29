/**
 * webpack开发环境配置
 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ENV = process.env.NODE_ENV = process.env.ENV = 'develoption';
const baseConfig = require('./webpack.base.js');
const config = require('./config');

const devConfig = webpackMerge(baseConfig, {
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});

module.exports = devConfig;
