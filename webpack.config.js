const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");




module.exports = {
    entry: {
        'scripts':'./src/ts/script.ts',
    },
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            use: ['ts-loader', 'eslint-loader'],
            exclude: /node_modules/,
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // fallback to style-loader in development
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        url: false,
                        modules: false,
                    }
                },
                "sass-loader",
            ],
        },
        {
            test: /\.(gif|png|jpg|jpeg|svg)?$/,
            loader: 'file-loader',
            options: {
              name: 'build/images/[name].[ext]',
            },
        },
      ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.svg', '.png', '.jpeg', '.jpg'],
        alias: {
            images: path.resolve(__dirname, 'src/scss/images/'),
        },  
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/scss/images", to: "images" },
                {from: "./static/", to: ""}
            ]   
            },
        ),
      ],
    
  };