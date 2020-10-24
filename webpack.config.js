const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) => {
  const mode = env || "development"

  const config = {
    mode: mode,
    devtool: mode === "development" ? "cheap-module-eval-source-map" : false,
    entry: {
      app: path.join(__dirname, "src", "index.tsx"),
    },
    target: "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: [
        path.resolve(__dirname, "node_modules"),
        path.resolve(__dirname, "./src"),
      ],
    },
    optimization: {
      minimize: mode !== "development",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
          exclude: "/node_modules/",
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                modules: { auto: true },
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: "[name].js",
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      publicPath: "/",
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      hot: true,
      writeToDisk: true,
      historyApiFallback: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "bundle.css",
      }),
    ],
  }

  return config
}
