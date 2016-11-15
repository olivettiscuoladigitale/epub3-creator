var webpack = require('webpack');

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