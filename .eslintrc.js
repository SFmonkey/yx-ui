const prettierConfig = require('./.prettierrc.js');

module.exports = {
    env: {
        mocha: true,
    },
    globals: {
        expect: true,
        sinon: true,
    },
    extends: [
        'sifu/vue',
        // "plugin:prettier/recommended"
    ],
    // plugins: ['prettier'],
    // rules: {
    //     'prettier/prettier': ['error', prettierConfig]
    // }
};
