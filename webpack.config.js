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
            use: ['ts-loader'],
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
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'bundle.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/scss/images", to: "images" },
                {from: "./static/route", to: "route"}
            ]   
            },
        ),
      ],
    
  };

// Hard code this to production but can be adapted to accept args to change env.
// const mode = 'production';

// module.exports = {
//   mode,

//   output: {
//     // Webpack will create js files even though they are not used
//     filename: '[name].bundle.js',
//     chunkFilename: '[name].[chunkhash].chunk.js',
//     // Where the CSS is saved to
//     path: path.resolve(__dirname, 'css'),
//     publicPath: "/css"
//   },

//   resolve: {
//     extensions: ['.css', '.scss'],
//     alias: {
//       // Provides ability to include node_modules with ~
//       '~': path.resolve(process.cwd(), 'src'),
//     },
//   },

//   entry: {
//     // Will create "styles.css" in "css" dir.
//     "styles": './src/scss/*.scss',
//     "scripts": './src/ts/*.ts'
//   },

//   module: {
//     rules: [
//       {
//         test: /\.scss$/,
//         use: [
//           // Extract and save the final CSS.
//           MiniCssExtractPlugin.loader,
//           // Load the CSS, set url = false to prevent following urls to fonts and images.
//           { loader: "css-loader", options: { url: false, importLoaders: 1 } },
//           // Add browser prefixes and minify CSS.
//           { loader: 'postcss-loader', options: { plugins: [autoprefixer(), cssnano()] }},
//           // Load the SCSS/SASS
//           { loader: 'sass-loader' },
//         ],
//       },
//     ],
//   },

//   plugins: [
//     // Define the filename pattern for CSS.
//     new MiniCssExtractPlugin({
//       filename: '[name].css',
//       chunkFilename: '[id].css',
//     })
//   ]
// }

































// module.exports = {
//   mode: "production",
//   entry: "./src/ts/script.ts",
//   devtool: "source-map",
//   target: "web",
//   externals:[],
//   output: {
//     publicPath: "/",
//     path: path.resolve(__dirname, "build"),
//     filename: "bundle.js",
//   },
//   resolve: {
//     extensions: [".ts", ".js", ".css", ".scss"],
//     alias: {
//       "@helpers": path.resolve(__dirname, "./src/ts/helpers"),
//       "@components": path.resolve(__dirname, "./src/ts/components"),
//       "@route": path.resolve(__dirname, "./src/ts/route"),
//       "@scss": path.resolve(__dirname, "./src/scss"),
//       "@": path.resolve(__dirname, "./src"),
//     },
//     fallback: {
//       fs: false,
//       path: false,
//       assert: false,
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.tsx?$/,
//         exclude: [/\.spec\.ts$/],
//         use: [
//           {
//             loader: "ts-loader",
//             options: {
//               configFile: path.resolve(__dirname, "tsconfig.json"),
//             },
//           },
//         ],
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.scss$/,
//         use: [
//             {
//                 loader: 'css-loader',
//                 options: {
//                     url: false,
//                     modules: true,
//                 }
//             },
//             {loader: "postcss-loader"},
//             {loader: "sass-loader"}
//         ],
//         exclude: /node_modules/,
//       },
//     ],
//   },
// };


// module.exports = {
//     entry: './src/ts/script.ts',
//     module: {
//         rules: [

//         { test: /\.tsx?$/, loader: "ts-loader" }, 

//         {
//             test: /\.s[ac]ss$/,
//             use: [{
//               loader: 'style-loader',
//             }, {
//               loader: 'css-loader',
//               options: {
//                 url: false,
//                 modules: true,
//               }
//             }, {
//               loader: 'postcss-loader',
//             }, {
//               loader: 'sass-loader',
//               options: {
//               }
//             }]
//           },
//         ]
//     },
//     resolve: {
//         extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
//     },
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//         publicPath: "/css",
//     },
// };