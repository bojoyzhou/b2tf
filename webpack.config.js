var webpack = require('webpack')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: './static',
        publicPath: '/static/',
        filename: 'entry.js'
    },
    module: {
        // avoid webpack trying to shim process
        noParse: /es6-promise\.js$/,
        loaders: [{
            test: /\.js$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            exclude: /node_modules|min|config/,
            loader: 'babel'
        }, {
            test: /\.jade$/,
            loader: "jade-loader"
        }, {
            test: /\.html$/,
            loader: 'mustache'
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}