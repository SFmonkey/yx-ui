const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = require('./config');
module.exports = {
    mode: 'production',
    entry: path.resolve(process.cwd(), 'packages/index.js'),
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: 'index.js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'YX',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
    },
    externals: {
        vue: config.vue,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
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
        ],
    },
    plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()],
};
