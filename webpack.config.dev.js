const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

module.exports = {
  // DEVELPMENT MODE
  mode: "development",
  // Watch Mode enabled
  // watch: true,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    // Hash name
    filename: "[name].[contenthash].js",
    // Hash Images
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
    //Webpack Alias
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        //BABEL
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // CSS LOADER
        test: /\.css|styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        // IMAGES LOADER
        test: /\.png/,
        type: "asset/resource",
      },
      {
        //FONTS
        test: /\.(woff|woff2)$/,
        type: "javascript/auto",
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    // HTML loader
    new HtmlWebPackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    // CSS loader
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    // Copy path
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    // ENV variables loader
    new DotEnv(),
    // BUNDLE
    // USAGE: npx webpack --profile --json > stats.json
    // npx webpack-bundle-analyzer stats.json
    new BundleAnalyzerPlugin(),
  ],
  // DEV SERVER
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 5500,
    open: true,
  },
};