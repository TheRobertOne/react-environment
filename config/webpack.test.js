/**
 * webpack测试环境配置
 */
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

const ENV = process.env.NODE_ENV = process.env.ENV = 'test';

var baseConfig = require('./webpack.base.js');
const config = require('./config');

// TODO：后续完善
module.exports = webpackMerge(baseConfig, {

});