const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  optimization: { minimize: false },

  entry: ["whatwg-fetch", "./build/index.js"],
  output: {
    path: __dirname + "/jupyter_euporie/static",
    filename: "bundle.js",
  },
  bail: true,
  devtool: "cheap-source-map",
  mode: "production",
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.html$/, use: "file-loader" },
      { test: /\.md$/, use: "raw-loader" },
      {
        // In .css files, svg is loaded as a data URI.
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.css$/,
        use: {
          loader: "svg-url-loader",
          options: { encoding: "none", limit: 10000 },
        },
      },
      {
        // In .ts and .tsx files (both of which compile to .js), svg files
        // must be loaded as a raw string instead of data URIs.
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.js$/,
        use: {
          loader: "raw-loader",
        },
      },
      {
        test: /\.(png|jpg|gif|ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: "url-loader", options: { limit: 10000 } }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // Needed for Blueprint. See https://github.com/palantir/blueprint/issues/4393
      "process.env": "{}",
      // Needed for various packages using cwd(), like the path polyfill
      process: { cwd: () => "/" },
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from:
    //         "node_modules/xterm-addon-image/lib/xterm-addon-image-worker.js",
    //       to: __dirname + "/jupyter_euporie/static/xterm-addon-image-worker.js",
    //     },
    //   ],
    // }),
  ],
};
