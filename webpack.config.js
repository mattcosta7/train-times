var webpack = require("webpack");
const path = require("path");
module.exports = {
  entry: {
    app: ["babel-polyfill", "./client/client.js"]
  },
  output: {
    path: path.join(__dirname, ".", "public", "scripts"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [new webpack.DefinePlugin({})],
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.js?$|\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [["env", { modules: false }], "stage-0"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
