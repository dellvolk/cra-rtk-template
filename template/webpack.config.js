const path = require("path")
const Dotenv = require("dotenv-webpack")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { ESBuildMinifyPlugin } = require("esbuild-loader")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

var isDevelopment = true

const webpack_config = {
	mode: isDevelopment ? "development" : "production",
	cache: true,
	stats: isDevelopment
		? {
			preset: "minimal",
			moduleTrace: true,
			errorDetails: true,
			warnings: true,
		}
		: false,
	watchOptions: {
		aggregateTimeout: 2000,
		poll: 2000,
	},
	entry: {
		app: "./src/index.tsx",
	},
	output: {
		filename: "[name].js?v=[chunkhash]",
		chunkFilename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		assetModuleFilename: "src/assets/images/[name].[ext]",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx", ".scss", ".css"],
		alias: {
			process: "process/browser",
		},
	},
	devServer: {
		hot: true,
		open: true,
		compress: true,
		bonjour: true,
		historyApiFallback: {
			disableDotRule: true, // Rule for the history url looks like ?id=sum.trick
		},
		proxy: {
			"/api": proccess.env.API_URL,
		},
		port: 3000,
		client: {
			overlay: {
				errors: isDevelopment,
				warnings: false,
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "esbuild-loader",
				exclude: /node_modules/,
				options: {
					loader: "jsx", // Remove this if you're not using JSX
					target: "es2016", // Syntax to compile to (see options below for possible values)
				},
			},
			{
				test: /\.ts(x?)$/,
				use: [
					"babel-loader",
					"ts-loader",
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "media/[name].[ext]",
				},
				type: "javascript/auto",
			},
			{
				test: /\.(otf|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
				type: "asset/resource",
				generator: {
					filename: "fonts/hash_fonts/[hash][ext][query]",
				},
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				exclude: /\.(woff2?|eot|ttf|otf)(v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "fonts/[name].[ext]",
				},
				type: "javascript/auto",
			},
			{
				test: /\.(jpe?g|svg|png|gif|ico)(\?v=\d+\.\d+\.\d+)?$/i,
				type: "asset/resource",
				generator: {
					filename: "images/hash_images/[hash][ext][query]",
				},
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				exclude: /\.(png|jpe?g|gif|svg)(v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "images/[name].[ext]",
				},
				type: "javascript/auto",
			},
			{
				test: /\.css$/,
				use: [
					isDevelopment
						? "style-loader"
						: {
							loader: MiniCssExtractPlugin.loader,
						},
					{
						loader: "css-loader",
						options: {
							sourceMap: isDevelopment,
							url: true,
						},
					},
					{
						loader: "esbuild-loader",
						options: {
							loader: "css",
							minify: true,
						},
					},
				],
			},
			{
				test: /\.(sa|sc)ss$/,
				use: [
					isDevelopment
						? "style-loader"
						: {
							loader: MiniCssExtractPlugin.loader,
						},
					{
						loader: "css-loader",
						options: {
							sourceMap: isDevelopment,
							url: true,
						},
					},
					{
						loader: "resolve-url-loader",
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: { quietDeps: true },
						},
					},
				],
			},
		],
	},
	optimization: {
		minimizer: [
			new ESBuildMinifyPlugin({
				target: "es2015", // Syntax to compile
			}),
		],
	},
	performance: {
		hints: false, // Disable warnings about size limit
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "./index.html?v=[chunkhash]",
			template: "./public/index.html",
			favicon: "./public/favicon.ico",
			inject: true,
			minify: !isDevelopment
				? {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true,
				}
				: false,
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css?v=[contenthash]",
		}),
		// new webpack.ProvidePlugin({
		//   process: "process/browser"
		// }),
		new Dotenv({
			path: `./.env`,
		}),
		new CleanWebpackPlugin(),
	],
	devtool: isDevelopment ? "source-map" : false,
}

module.exports = (env, argv) => {
	if (argv.mode === "development") {
		isDevelopment = true
	} else {
		isDevelopment = false
	}
	return webpack_config
}
