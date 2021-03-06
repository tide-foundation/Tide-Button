const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/index.ts"],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "tide-button.js",
    globalObject: "this",
    library: "Tide",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".tsx", ".ts"] },
  plugins: [
    new FileManagerPlugin({
      onEnd: {
        copy: [
          {
            source: "./dist/tide-button.js",
            destination: "../dauth.me/src/Dauth/Dauth/client/public/tide-button.js",
          },
          {
            source: "./dist/tide-button.js",
            destination: "../secure-api/dAuth/src/dAuth.STS.Identity/wwwroot/dist/js/tide-button.js",
          },
          // {
          //   source: "./dist/tide-button.js",
          //   destination: "../Tide-Vendor/Tide.Vendor/Client/public/tide-button.js",
          // },
          // {
          //   source: "./dist/tide-button.js",
          //   destination: "../NewCorp/NewCorp/NewCorp/client/public/tide-button.js",
          // },
          // {
          //   source: "./dist/tide-button.js",
          //   destination: "../basic-tide-app/public/tide-button.js",
          // },
        ],
      },
    }),
  ],
};
