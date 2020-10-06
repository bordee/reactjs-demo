const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] },
            },
            {
                test: /\.css$/i,
                use:[
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "www/"),
        publicPath: "/",
        filename: "app.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "www/"),
        port: 8080,
        publicPath: "http://localhost:8080/"
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: "index.html",
            title: "ReactJS Demo",
            publicPath: "/"
        })
    ]
};
