const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(process.cwd(), 'examples/main.js'),
    output: {
        path: path.resolve(process.cwd(), 'examples/dist/'),
        filename: 'index.js',
        chunkFilename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules'],
    },
    devServer: {
        host: '127.0.0.1',
        port: 8089,
        publicPath: '/',
        hot: true,
        clientLogLevel: 'error',
    },
    performance: {
        hints: false,
    },
    stats: {
        children: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
            },
            {
                test: /\.s?css$/,
                loaders: ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './examples/index.html',
        }),
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
    ],
};
