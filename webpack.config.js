const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
    mode: 'development',
    entry: {
        defaultapp: ['./stub/js/script.js']
    },
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: '[name].js'
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
            title: "My App",
            hash: true,
            template: "stub/index.html"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, outputDirectory),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }

};