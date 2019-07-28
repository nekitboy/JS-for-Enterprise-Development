const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const development = process.env.MODE === 'development'
const API_URL = process.env.API

const outputDirectory = 'dist';

module.exports = {
    mode: 'development',
    entry: {
        defaultapp: ['./src/index.jsx']
    },
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: '[name].js',
        publicPath: '/'
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
            title: "My App",
            hash: true,
            template: "stub/index.html"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/style.css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            'API_URL': JSON.stringify(API_URL)
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, outputDirectory),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [
            //         { loader: "style-loader" },
            //         { loader: "css-loader", options: { importLoaders: 1 }, }
            //     ]
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        },
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    development ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', 'css'],
        modules: [
            path.resolve(__dirname),
            path.resolve('./node_modules')
        ]
    }
};