/**
 * webpack预编译配置
 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.base.js');
const config = require('./config');

module.exports = {
    entry: {
        vendor: config.vendors
    },
    output: {
        path: config.dir_libs,
        filename: '[name].dll.js',
        library: '[name]_library'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DllPlugin({
            context: config.root,
            path: path.join(config.root, 'tools/[name]-manifest.json'),
            name: '[name]_library'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            },
            comments: false
        })
    ]
};
