const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');

const production = (config) => {
    console.log('=> Build Production');
    config.module.rules.push({
        test: /\.scss$/,
        resolve: {
            extensions: ['.scss', '.sass'],
        },
        exclude: /node_modules/,
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
            // 'filename': '[name].[contenthash].css'
            'filename': 'css/[name].css'
        })
    );

    config.devServer = {
        hot: false,
        inline: false,
    };
}

const development = (config) => {
    config.module.rules.push({
        test: /\.scss$/,
        resolve: {
            extensions: ['.scss', '.sass'],
        },
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
    }

    if (mode === 'DEVELOPMENT') {
        development(config);
    }
    if (mode === 'PRODUCTION') {
        production(config);
    }
    config.stats = true;
    return config;
};