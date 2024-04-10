const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const path = require("path");

module.exports = merge(config, {
	mode: "development",
	devtool: "eval",
	devServer: {
		static: "./build",
		client: {
			logging: "verbose",
		},
		historyApiFallback: true,
		hot: true,
		port: 9000,
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].[contenthash].js",
		assetModuleFilename: "[name][ext]",
		publicPath: "/",
	},
});
