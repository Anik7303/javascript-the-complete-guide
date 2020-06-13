const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    // eslint-disable-next-line sort-keys
    entry: './src/app.js',
    output: {
        filename: '[contenthash].js',
        path: path.join(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/',
    },
    devServer: {
        contentBase: './',
    },
    devtool: 'cheap-source-map',
    plugins: [new cleanPlugin.CleanWebpackPlugin()],
};
