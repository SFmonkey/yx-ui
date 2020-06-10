var path = require('path');
var nodeExternals = require('webpack-node-externals');

exports.vue = {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue',
};

exports.alias = {
    '@src': path.resolve(__dirname, '../src'),
    examples: path.resolve(__dirname, '../examples'),
    '@packages': path.resolve(__dirname, '../packages'),
    'yx-ui': path.resolve(__dirname, '../'),
};

exports.externals = [
    {
        vue: 'vue',
        'YX-ui/src/locale': 'YX-ui/lib/locale',
    },
    nodeExternals(),
];
