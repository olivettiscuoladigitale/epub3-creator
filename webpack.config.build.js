/*
 var webpack = require('webpack');
 var path = require('path');

 module.exports = {
 entry:'./src/index.ts',
 output: {
 filename: './dist/epub-creator.js',
 library: "EpubCreator",
 libraryTarget: 'umd',
 umdNamedDefine: true
 },
 devtool: 'source-map',
 resolve: {
 extensions: ['', '.webpack.js', '.web.js', '.ts', '.js',  '.jsx', '.tsx']
 },
 plugins: [
 new webpack.optimize.UglifyJsPlugin()
 ],
 module: {
 preLoaders: [
 { test: /\.tsx?$/, loader: 'tslint', exclude: /node_modules/ }
 ],
 loaders: [
 { test: /\.ts$/, loader: 'ts',  exclude: /node_modules/ }
 ]
 }
 };
 */


var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var webpack = require('webpack'),
    yargs = require('yargs');

var libraryName = 'epub-creator',
    plugins = [],
    outputFile;

if (yargs.argv.p) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

plugins.push(new TypedocWebpackPlugin({
        name: libraryName,
        mode: 'file',
     //   theme: './typedoc-theme/',
        includeDeclarations: false,
        ignoreCompilerErrors: true,
    }, './src')
);


var config = {
    entry: [
        __dirname + '/src/index.ts'
    ],
    devtool: 'source-map',
    output: {
        filename: './dist/' + outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        preLoaders: [
            {test: /\.tsx?$/, loader: 'tslint', exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.tsx?$/, loader: 'ts', exclude: /node_modules/}
        ]
    },
    resolve: {
        //  root: path.resolve('./src'),
        extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.jsx', '.tsx']
    },
    plugins: plugins,

    // Individual Plugin Options
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
};

module.exports = config;


