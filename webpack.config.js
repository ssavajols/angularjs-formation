var path = require("path");
var webpack = require("webpack");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: {
        main: [
            "./projet/app/main.js"
        ]
    },
    output: {
        path: path.join(__dirname, "projet/js"),
        filename: "[name].js",
        libraryTarget: "umd",
        publicPath: "js/"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw" },
            { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
            { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?size=8192' }
        ]
    },
    externals: {
        "angular":"angular"
    },
    resolve: {
        extensions: ["", ".js"]
    },
    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};