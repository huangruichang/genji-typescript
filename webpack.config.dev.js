const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const apiMocker = require("webpack-api-mocker");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "dist.js",
    path: path.resolve(__dirname, "..", "dist")
  },
  module: {
    rules: [
      {
        test: /\.js|\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    before(app) {
      apiMocker(app, path.resolve("mock/api.js"));
    },
    contentBase: path.resolve(__dirname, "..", "dist"),
    compress: true,
    port: 8083
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  resolve: {
    alias: {},
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  }
};
