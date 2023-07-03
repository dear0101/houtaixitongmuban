const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProgressPlugin, DefinePlugin } = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require("fs");
console.log(process.env.NODE_ENV, "ENV");

const url = "http://192.168.14.244:9998";

module.exports = {
  mode: "development",
  output: {
    filename: "js/[name].[chunkhash:8].bundle.js",
    clean: true,
    path: path.resolve(__dirname, "dist"),
    publicPath: process.env.NODE_ENV == "production" ? "./" : "",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"], //忽略文件扩展名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pub": path.resolve(__dirname, "./public"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@conf": path.resolve(__dirname, "./src/config"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@comps": path.resolve(__dirname, "./src/assets/components"),
    },
  },
  entry: path.resolve(__dirname, "./src/main.js"),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      //   {
      //     test: /\.(png|jpg|svg|gif)$/i,
      //     type: "asset",
      //     generator: {
      //       filename: "img/[name][ext][query]", // 局部指定输出位置
      //     },
      //     parser: {
      //       dataUrlCondition: {
      //         maxSize: 50 * 1024, // 限制于 50kb
      //       },
      //     },
      //   },

      {
        test: /\.(png|jpg|svg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              limit: 50 * 1024, // 限制于 50kb,小于这个会转成base64 url
              outputPath: "img",
              publicPath: "img",
              fallback: "file-loader",
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
  resolveLoader: {
    // modules: ["node_modules", path.resolve(__dirname, "./src/assets/loaders")],
  },
  devServer: {
    proxy: {
      "/": {
        target: url,
        pathRewrite: { "^/": "" },
      },
    },
  },

  plugins: [
    // new DefinePlugin({
    //   __VUE_OPTIONS_API__: true,
    //   __VUE_PROD_DEVTOOLS__: false,
    // }),
    new CleanWebpackPlugin(), //打包前清空打包目录
    new ProgressPlugin(), //打包进度展示
    new VueLoaderPlugin(), //处理vue文件
    // new CssMinimizerPlugin(), //将css压缩
    new MiniCssExtractPlugin({
      //将css提取出单独文件
      filename: "css/[name].[chunkhash:8].css",
    }),
    new HtmlWebpackPlugin({
      //将html模板解析将js和css导入到新的html中再输出到对应文件夹
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new CopyWebpackPlugin({
      //将静态文件资源不通过解析,复制到对应文件夹
      patterns: [
        {
          from: "public",
          filter: async (resourcePath) => {
            // const data = await fs.promises.readFile(resourcePath);
            const data = await path.basename(resourcePath);
            if (data === "index.html") return false;
            return true;
          },
        },
      ],
    }),
  ],
};
