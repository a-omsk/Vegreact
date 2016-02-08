module.exports = {
    entry: './js/app.js',
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, {test: /\.css$/,
            exclude: '/node_modules/',
            loader: "style-loader!css-loader"}]
    },
    devServer: {
        contentBase: 'public'
    },

    watch: true
};
