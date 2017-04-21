const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

function VersionPlugin(options) {
}

VersionPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {

        let fs = require('fs');
        let pkg = require('./package.json');
        let version = pkg.version.split('.');
        let last = version.length - 1;
        let newVersion = '';

        version[last] = parseInt(version[last]) + 1;

        for (let i = 0; i < version.length; i++) {
            newVersion += version[i];
            if (i !== version.length - 1) {
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


module.exports = {
    target: "web",
    context: path.resolve(__dirname, './src'),
    devtool: 'source-map',
    entry: {
        "epub-creator": "index.ts",
        "epub-creator.min": "index.ts",
    },
    output: {
        path: path.resolve(__dirname, "./dist"), // string
        filename: "[name].js", // for multiple entry points
        library: "epc",
        libraryTarget: "umd"
    },
    plugins: [
        new UglifyJSPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false,
                unused: false,
                booleans: false
            }
        }),
        new VersionPlugin({options: true}),
        new TypedocWebpackPlugin({
            name: "Epub-Creator",
            mode: 'file',
            //   theme: './typedoc-theme/',
            includeDeclarations: false,
            ignoreCompilerErrors: true,
        }, './src')

    ],

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
                test: /\.tsx?$/,
                loader: 'ts-loader?',
                exclude: [
                    path.resolve(__dirname, "/node_modules/")
                ]
            }
        ]

    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.jsx', '.tsx']
    },
    performance: {
        hints: "warning",
        maxAssetSize: 200000,
        maxEntrypointSize: 400000
    }

};