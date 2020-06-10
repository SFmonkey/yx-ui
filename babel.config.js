module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                modules: false,
                targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
                },
            },
        ],
    ],
    env: {
        test: {
            plugins: ['istanbul'],
        },
    },
};
