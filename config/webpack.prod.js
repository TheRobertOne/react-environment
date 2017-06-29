/**
 * webpack生产环境配置
 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const baseConfig = require('./webpack.base.js');
const config = require('./config');

const prodConfig = webpackMerge(baseConfig, {
    output: {
        publicPath: '/',
        path: config.dir_dist,
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
});

module.exports = prodConfig;