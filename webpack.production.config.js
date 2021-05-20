const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'assets/js/bundle.[contenthash].js',
		path: path.resolve(__dirname, './project/'),
		publicPath: ''
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				type: 'asset/resource',
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024
					}
				}
			},
			{	
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader'
				]
			},
			{	
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins:  [
									require("precss"),
									require("autoprefixer")
								]
							}
						}
					},
					"sass-loader",
				]
			},
			{
				test: /\.js$/,
				exclude: '/node_modules',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}
			},
			{
				test: /\.hbs$/,
				use: [
					"handlebars-loader"
				]
			},
			{
				test: /\.(woff2|woff|ttf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							publicPath: "../fonts/",
			    			outputPath: "assets/fonts",
						}
					}
				]
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "assets/css/main.[contenthash].css"
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Hello world',
			description: "Some description",
			template: 'src/index.hbs',
			filename: 'index.html',
			templateParameters:require('./src/markers.json'),
			minify: false
		}),
		new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/images'),
                    to: path.resolve(__dirname, 'project/assets/images')
                }
            ]
        }),
	]
};