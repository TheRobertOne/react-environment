/**
 * webpack基本配置
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');

const config = require('./config');
const ENV = process.env.NODE_ENV = process.env.ENV;
const isProd = ENV === 'production';
const isDeveloption = ENV === 'develoption';

const babelPlugins = [
    'transform-runtime',
    'syntax-dynamic-import',
    ["import", [{
        "libraryName": "antd",
        "style": "css"
    }]]
];
if (isDeveloption) {
    babelPlugins.push('react-hot-loader/babel');
}
const webpackConfig = {
    context: config.root,

    entry: {
        app: [path.join(config.dir_src, 'index.js')]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|libs)/,
                enforce: 'pre',
                loader: 'eslint-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|libs)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        'presets': [
                            ['es2015', { 'modules': false }],
                            'react',
                            'stage-0'
                        ],
                        'plugins': babelPlugins
                    }
                }
            },
            {
                test: /\.s?(c|a)ss$/,
                exclude: [
                    path.join(config.dir_src, 'public/'),
                    path.join(config.root, 'node_modules')
                ],
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: true,
                                localIdentName: isProd ? '[hash:base64:4]' : '[name]_[local]_[hash:base64:3]',
                                minimize: isProd ? {
                                    safe: true,
                                    sourcemap: false,
                                    discardComments: {
                                        removeAll: true
                                    },
                                    autoprefixer: {
                                        add: true,
                                        remove: true
                                    },
                                    reduceIdents: false,
                                    mergeIdents: false,
                                    discardUnused: false,
                                } : false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: isProd ? false : 'inline'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProd
                            }
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.s?(c|a)ss$/,
                include: [
                    path.join(config.dir_src, 'public/'),
                    path.join(config.root, 'node_modules')
                ],
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                minimize: isProd ? {
                                    safe: true,
                                    sourcemap: true,
                                    discardComments: {
                                        removeAll: true
                                    },
                                    autoprefixer: {
                                        add: true,
                                        remove: true
                                    },
                                    reduceIdents: false,
                                    mergeIdents: false,
                                    discardUnused: false,
                                } : false,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: 'inline'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: config.root,
            manifest: require(path.join(config.root, 'tools/vendor-manifest.json'))
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: 'common',
            minChunks: 3
        }),
        new HtmlWebpackPlugin({
            template: path.join(config.dir_src, 'index.html'),
            title: config.info.title
        }),
        new StyleLintPlugin({
            files: ['**/*.css', '**/*.scss', '**/*.sass']
        }),
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
            disable: isDeveloption,
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(ENV),
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
};

module.exports = webpackConfig;