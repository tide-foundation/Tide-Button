const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const generalConfig = {
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "./dist")],
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [
          {
            source: "./dist/tide-node.js",
            destination: "../dAuth/dAuth/src/dAuth.STS.Identity.Tide/Scripts/tide-node.js",
          },
        ],
      },
    }),
  ],
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
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
};

const nodeConfig = {
  entry: "./src/index.ts",
  target: "node",

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "tide-node.js",
    libraryTarget: "umd",
    libraryExport: "default",
  },
};

const browserConfig = {
  entry: "./src/index.ts",
  target: "web",
  output: {
    path: path.resolve(__dirname, "./dist"),

    filename: "tide-browser.js",
    globalObject: "this",
    library: "Tide",
  },
  // plugins: [
  //   new FileManagerPlugin({
  //     onEnd: {
  //       copy: [
  //         {
  //           source: "./dist/tide-browser.js",
  //           destination: "../dAuth/dAuth/src/dAuth.STS.Identity/wwwroot/dist/js/tide-browser.js",
  //         },
  //       ],
  //     },
  //   }),
  // ],
};

module.exports = (env, argv) => {
  // if (argv.mode === "development") {
  //   generalConfig.devtool = "cheap-module-source-map";
  // } else if (argv.mode === "production") {
  // } else {
  //   throw new Error("Specify env");
  // }

  Object.assign(nodeConfig, generalConfig);
  Object.assign(browserConfig, generalConfig);

  return [nodeConfig, browserConfig];
};

// const path = require("path");
// const FileManagerPlugin = require("filemanager-webpack-plugin");

// module.exports = {
//   mode: "production",
//   entry: ["./src/index.ts"],
//   output: {
//     path: path.resolve(__dirname, "dist/"),
//     filename: "tide-button.js",
//     globalObject: "this",
//     library: "Tide",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: "ts-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: "babel-loader",
//       },
//     ],
//   },
//   resolve: { extensions: ["*", ".js", ".jsx", ".tsx", ".ts"] },
//   plugins: [
//     new FileManagerPlugin({
//       onEnd: {
//         copy: [
//           {
//             source: "./dist/tide-button.js",
//             destination: "../dAuth/dAuth/src/dAuth.STS.Identity/wwwroot/dist/js/tide-button.js",
//           },
//           // {
//           //   source: "./dist/tide-button.js",
//           //   destination: "../Tide-Vendor/Tide.Vendor/Client/public/tide-button.js",
//           // },
//           // {
//           //   source: "./dist/tide-button.js",
//           //   destination: "../NewCorp/NewCorp/NewCorp/client/public/tide-button.js",
//           // },
//           // {
//           //   source: "./dist/tide-button.js",
//           //   destination: "../basic-tide-app/public/tide-button.js",
//           // },
//         ],
//       },
//     }),
//   ],
// };
