const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const Components = require('../components.json');
const config = require('./config');

module.exports = {
    mode: 'production',
    entry: Components,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        libraryExport: 'default',
        chunkFilename: '[id].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
    },
    externals: config.externals,
    performance: {
        hints: false,
    },
    stats: 'none',
    optimization: {
        minimize: false,
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
    plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()],
};
