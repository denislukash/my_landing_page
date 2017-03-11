const path = require('path');
const webpack = require('webpack');
const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
    entry: "./script/index.js",
    output: {
        filename: './script/bundle.js'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    plugins: [
        new webpackUglifyJsPlugin({
            minimize: true,
            dead_code: false,
            cacheFolder: path.resolve(__dirname, './cache/')
        })
    ]
};