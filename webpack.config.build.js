const config = require("./webpack.config.dev.js");
const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {...config,
  entry: {
    bundle: config.entry.bundle.filter(it => it !== "react-hot-loader/patch")
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].js",
  },
  plugins: [
    ...config.plugins.slice(1),
    new webpack.EnvironmentPlugin({
      "NODE_ENV": "production"
    }),
    // For react please read https://reactjs.org/docs/optimizing-performance.html#use-the-production-build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      asset: "bundle.js",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],
  module: {
    rules: [
      ...config.module.rules.filter(rule => rule.loader !== "ts-loader"),
      {
        ...config.module.rules.find(rule => rule.loader === "ts-loader"),
        options: { transpileOnly: false }
      }
    ]
  }
};
