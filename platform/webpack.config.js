const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './resources/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            }
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'resources/')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/lib'),
        filename: 'bundle.js'
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: 'bundle.css',
            chunkFilename: '[id].css'
        })
    ]
};
