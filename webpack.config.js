var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './js/app.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        modulesDirectories: ['js', 'node_modules', 'js/components'],
        extensions: ['', '.js', '.jsx', '.es6', 'sass'],
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: '/node_modules/',
            include: path.join(__dirname, 'js'),
            loader: 'react-hot',
        }, {
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.css$/,
            exclude: '/node_modules/',
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.scss$/,
            exclude: '/node_modules/',
            loader: 'style-loader!css-loader!sass-loader!postcss-loader'
        }]
    },
    devServer: {
        contentBase: 'public',
        historyApiFallback: true
    }
};
