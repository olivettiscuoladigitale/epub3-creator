var webpack = require('webpack');

module.exports = {
    entry:'./test/demo.ts',
    output: {
        filename: './dist/epub-creator.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
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
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};