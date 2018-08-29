const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);

    // config.entry.default = [ path.resolve(__dirname, '../themes/default.scss')];
    // config.entry.secondary = [ path.resolve(__dirname, '../themes/secondary.scss')];

    config.module.rules.push({
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: [
            {
                loader: 'style-loader/useable',
                options: {
                    hmr: true
                }
            },
            'css-loader',
            'sass-loader'
        ]
    });

    config.resolve = {
        extensions: ['.js', '.jsx']
    }
    config.devServer = {
        contentBase: "./public",
        hot: true,
        stats: {
            colors: true
        },
        quiet: false,
        noInfo: false
    }

    config.stats = true;

    return config;
};
