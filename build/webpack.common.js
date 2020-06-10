const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config');

module.exports = {
    mode: 'production',
    entry: path.resolve('packages/index.js'),
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: 'YX-ui.common.js',
        chunkFilename: '[id].js',
        libraryExport: 'default',
        libraryTarget: 'commonjs2',
        library: 'YX',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
    },
    externals: config.externals,
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
