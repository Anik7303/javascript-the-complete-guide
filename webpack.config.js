const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // eslint-disable-next-line sort-keys
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/',
    },
    devServer: {
        contentBase: './',
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [new cleanPlugin.CleanWebpackPlugin()],
};
