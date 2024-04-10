const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	target: "web",
	entry: "./src/index.tsx",
	optimization: {
		usedExports: true,
		moduleIds: "deterministic",
		splitChunks: {
			chunks: "all",
			minSize: 20000,
			minRemainingSize: 0,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	resolve: {
		modules: [path.join(__dirname, "src"), "node_modules"],

		alias: {
			react: path.join(__dirname, "node_modules", "react"),
			process: "process/browser",
		},
		extensions: [".tsx", ".ts", ".js", ".jsx", ".jpg", ".png"],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},

			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					cacheCompression: false,
					cacheDirectory: true,
				},
			},
			{
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
				],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
						},
					},
				],
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ["@svgr/webpack"],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
			filename: "index.html",
			manifest: "./public/manifest.json",
		}),
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
	],
};
