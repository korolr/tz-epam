const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env, argv) => {
  const mode = argv.mode || "development"

  const config = {
    mode: mode,
    devtool: mode === "development" ? "cheap-module-eval-source-map" : false,
    entry: {
      app: path.join(__dirname, "src", "index.tsx"),
    },
    target: "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: "/node_modules/",
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      hot: true,
      writeToDisk: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
    ],
  }

  return config
}
