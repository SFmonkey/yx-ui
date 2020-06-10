const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
    },
    module: {
        rules: [
            // babel-loader
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [resolve('src'), resolve('test')],
            },

            // vue loader
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
    plugins: [new VueLoaderPlugin()],
};
