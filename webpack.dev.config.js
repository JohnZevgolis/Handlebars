const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'assets/js/bundle.js',
		path: path.resolve(__dirname, './project/'),
		publicPath: ''
	},
	mode: 'development',
	devServer: {
		contentBase: path.resolve(__dirname, "./project/"),
		index: "index.html",
		port: 9000
	},
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
					'style-loader', 'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader', 'css-loader', 'sass-loader'
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
							outputPath: "fonts/"
						}
					}
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Hello world',
			description: "Some description",
			template: 'src/index.hbs',
			filename: 'index.html',
			templateParameters:require('./src/markers.json')
		}),
		new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/images'),
                    to: path.resolve(__dirname, 'project/assets/images')
                }
            ]
        }),
        new webpack.ProvidePlugin({
        	$: "jquery",
        	jQuery: "jquery",
        	'window.jQuery': 'jquery'
        })
	]
};