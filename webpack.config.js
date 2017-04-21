const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports = {
    target: "web",
    context: path.resolve(__dirname),
    devtool: 'inline-source-map',
    entry: {
        demo: path.resolve(__dirname, "./demo/demo.ts")
    },
    output: {
        filename: "[name].[hash].js"
    },
    devServer: {
        contentBase: path.join(__dirname, '/'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    emitErrors: true,
                    failOnHint: true,
                    typeCheck: false,
                }
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader?',
                exclude: [
                    path.resolve(__dirname, "/node_modules/")
                ]
            },
            {test: /\*/, loader: 'url'},
        ]

    },
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
        function () {
            this.plugin("done", function (stats) {
                require("fs").writeFileSync(
                    path.join(__dirname, "./demo", "stats.js"),
                    "var wpManifest = '" + JSON.stringify(stats.toJson().assetsByChunkName) + "'");
            });
        },
        new OpenBrowserPlugin({url: 'http://localhost:8000/demo'}),

    ],
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname)
        ],
        extensions: ['*', '.webpack.js', '.web.js', '.ts', '.js']
    }

};