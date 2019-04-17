const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
// const defaultConfig = require('@storybook/react/dist/server/config/webpack.config.js').default;
const _ = require('lodash');

const production = (config) => {
    console.log('=> Build Production');
    config.module.rules.push({
        test: /\.scss$/,
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

module.exports = (baseConfig, env) => {
    // if (!baseConfig) {
    //     baseConfig = defaultConfig();
    // }
    // const config = genDefaultConfig(baseConfig, env);
    // config.resolve = {
    //     extensions: ['.js', '.jsx']
    // }

    const config = { ...baseConfig };
    if (process.env.NODE_ENV === 'development') {
        development(config);
    }
    if (process.env.NODE_ENV === 'production') {
        production(config);
    }
    config.stats = true;
    return config;
};
