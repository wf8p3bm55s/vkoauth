const path = require('path');
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
        path: path.resolve(__dirname, 'dist'),
    },
    context: path.resolve(__dirname, 'src'),
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['oauth'],
            filename: 'oauth.html'
        })
    ]
};