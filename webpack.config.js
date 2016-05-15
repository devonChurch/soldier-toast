var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var preLoaderEslint = {
    test: /\.(js|jsx)$/,
    loaders: ['eslint'],
    include:  __dirname + '/src/js'
};

var loaderSass = {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss-loader!sass')
};

var loaderJs = {
    test: /\.js$/,
    exclude: /node_modules/,
    // Automatically generates source maps without the sourceMaps config
    loader: 'babel',
    query: {
        // Activating extra Babel stages to access the spread operator on objects
        // for our immutable augmentation of the Redux state.
        presets: ['react', 'es2015', 'stage-2', 'stage-3']
    }
};

var loaderJson = {
    test: /\.json$/,
    loader: 'json'
};

var eslintWarnings = {
    failOnWarning: false,
    failOnError: false
};

// We are creating two entry points, one for the server and one for the client.
// This segregation allows us to construct the basis for the universal React app.
// We can differentiate their targets and run their respective tasks independently.
module.exports = [{
    name: 'client',
    target: 'web',
    context: __dirname + '/src',
    devtool: 'source-map',
    entry: './client.js',
    output: {
        path: __dirname + '/dist/static',
        filename: 'client.js'
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ],
    module: {
        preLoaders: [preLoaderEslint],
        loaders: [loaderSass, loaderJs]
    },
    eslint: eslintWarnings,
    postcss() {
        return [autoprefixer];
    }
},{
    name: 'server',
    target: 'node',
    context: __dirname + '/src',
    devtool: 'source-map',
    entry: './server.js',
    output: {
        path: __dirname + '/dist',
        filename: 'server.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from:  './feed.json', to: './feed.json' }
        ])
    ],
    module: {
        preLoaders: [preLoaderEslint],
        loaders: [loaderJs, loaderJson]
    },
    eslint: eslintWarnings
}];
