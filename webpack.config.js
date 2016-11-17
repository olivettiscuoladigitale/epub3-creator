var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry:'./demo/demo.ts',
    output: {
        publicPath: '/',
        filename: './dist/epub-creator.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', "*", '.webpack.js', '.web.js', '.ts', '.js']
    },
    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
      //   new webpack.optimize.UglifyJsPlugin()
    ],
    tslint: {
        emitErrors: true,
        failOnHint: true
    },
    module: {
        preLoaders: [
            { test: /\.tsx?$/, loader: 'tslint', exclude: /node_modules/ }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'ts' },
            { test: /\*/, loader: 'url' },
        ]
    }
};