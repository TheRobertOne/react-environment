"use strict";

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackDevConfig = require("./config/webpack.dev");
const config = require('./config');

webpackDevConfig.entry.app.unshift('react-hot-loader/patch', 'webpack-dev-server/client?' + config.siteResolve(), 'webpack/hot/dev-server');
const compiler = Webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, {
    historyApiFallback: true,
    compress: true,
    hot: true,
    publicPath: '/',
    inline: true,
	stats: {
		colors: true,
        cached: true
	}
});

server.listen(config.info.port, config.info.host, function() {
	console.log("Starting server on " + config.siteResolve());
});