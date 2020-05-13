/* eslint-disable */
module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'plugin:react/recommended',
        'airbnb'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 11
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'linebreak-style': ['error', 'windows'],
        'indent': ['error', 4],
        'no-console': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign':0,
        'global-require':0
    }
};