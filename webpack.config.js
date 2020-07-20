const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: ['./index.ts'],
        oauth: ['./oauth.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',                
            },
        ],
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './'),
    },
    context: path.resolve(__dirname, 'src'),
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '[name].bundle.js', 
                'index.html', 
                'oauth.html'
            ],
        }),
        new HtmlWebpackPlugin({
            title: "Index",
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: "OAuth",
            chunks: ['oauth'],
            filename: 'oauth.html'
        })
    ]
};