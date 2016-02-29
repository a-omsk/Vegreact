module.exports = {
    devtool: 'source-map',
    entry: './js/app.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
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
