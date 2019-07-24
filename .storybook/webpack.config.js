const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');

const production = (config) => {
    console.log('=> Build Production');
    config.module.rules.push({
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [{
                loader: 'css-loader',
                options: {
                    minimize: true,
                    importLoaders: 1
                }
            }, 'sass-loader'],
            fallback: 'style-loader',
            publicPath: '../'
        })
    });

    config.plugins.push(
        new ExtractTextPlugin({
            'filename': 'css/[name].css'
        })
    );

    config.devServer = {
        hot: false,
        inline: false,
    };
}

const development = (config) => {
    console.log('=> Build Development');
    config.module.rules.push({
        test: /\.scss$/,
        loader: [
            'style-loader/useable',
            'css-loader',
            'sass-loader'
        ]
    });

    config.devServer = {
        contentBase: './public',
        hot: true,
        stats: {
            colors: true
        },
        quiet: false,
        noInfo: false
    }
}

module.exports = async ({ config, mode }) => {
    config.resolve = {
        extensions: ['.js', '.jsx']
    };

    if (mode === 'DEVELOPMENT') {
        development(config);
    } else {
        production(config);
    }
    config.stats = true;
    return config;
};