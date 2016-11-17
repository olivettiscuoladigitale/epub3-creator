var TypedocWebpackPlugin = require('typedoc-webpack-plugin'),
    webpack = require('webpack'),
    yargs = require('yargs'),
    path = require('path');


function VersionPlugin(options) {
}

VersionPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {

        var fs = require('fs');
        var pkg = require('./package.json');
        var version = pkg.version.split('.');
        var last = version.length - 1;
        var newVersion = '';

        version[last] = parseInt(version[last]) + 1;

        for (var i = 0; i < version.length; i++) {
            newVersion += version[i];
            if (i != version.length - 1) {
                newVersion += '.';
            }
        }
        pkg.version = newVersion;
        //  pkg.versionDate = new Date();
        console.log('Build version: ' + newVersion);
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, '\t'));
    });
};

module.exports = VersionPlugin;


var libraryName = 'epub-creator',
    plugins = [],
    outputFile;

if (yargs.argv.p) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true,
        compress: {
            warnings: false,
            unused: false,
            booleans: false
        }
    }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

if (yargs.argv.d) {
    plugins.push(new TypedocWebpackPlugin({
            name: libraryName,
            mode: 'file',
            //   theme: './typedoc-theme/',
            includeDeclarations: false,
            ignoreCompilerErrors: true,
        }, './src')
    );

}

plugins.push(new VersionPlugin({options: true}));


var config = {
    entry: {
        "epub-creator": __dirname + '/src/index.ts',
        "epub-creator.min": __dirname + '/src/index.ts',
    },
    devtool: 'source-map',
    output: {
        filename: './dist/[name].js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        verbose: false
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
        root: path.resolve('./src'),
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


