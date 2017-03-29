const DEV = true;
const path = require('path');
const webpack = require('webpack');
const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('[name].css');
const PROD = !DEV;

module.exports = {
    entry: {
        lending: "./script/index.js",
        pairs: "./app/pairs/script/index.js",
        lines: "./app/lines/lines.js"
    },
    output: {
        path: "./build",
        publicPath: './build/',
        filename: "[name].js",
        library: '[name]'
    },

    watch: !DEV,

    watchOptions: {
        aggregateTimeout: 100
    },

    // devtool: DEV ? 'source-map' : null,

    module:{
        rules: [
            {
            	test: /\.less$/i,
            	use: extractLESS.extract(['css-loader', 'less-loader'])
            }
            //todo: another way to build style
        // {
        //     test: /\.less$/,
        //     use: [{
        //         loader: "style-loader"
        //     }, {
        //         loader: "css-loader", options: {
        //             sourceMap: false
        //         }
        //     }, {
        //         loader: "less-loader", options: {
        //             sourceMap: false
        //         }
        //     }]
        // }
            //todo: convert image to url 
            ,{
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 12000
                        }
                    }
                ]
            }
                        //todo: loader work, but css cant resolve parth to images
            // ,{
            //     test: /\.(jpe?g|png|gif|svg)$/i,
            //     loaders: [
            //         "file-loader?name=[path][name].[ext]"
            //         // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            //     ]
            // }
        ]
},

    plugins: [
        new webpackUglifyJsPlugin({
            minimize: true,
            dead_code: false,
            cacheFolder: path.resolve(__dirname, './cache/')
        }),
        extractLESS
    ],

    devServer: {
        host: 'localhost', //default
        port: 8080 //default
    }

};

if (PROD) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            //drop_console: true,
            dead_code: true,
            join_vars: true,
            warnings: false
        }
    }));
}