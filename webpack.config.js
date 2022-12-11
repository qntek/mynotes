const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './src/js/script.js',
	output: {
		filename: 'bundle.min.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	watch: false,
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					{
						loader: 'css-loader',
						options: {},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['autoprefixer']],
							},
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					{
						loader: 'css-loader',
						options: {},
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'), // Prefer `dart-sass`
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['autoprefixer']],
							},
						},
					},
				],
			},
			{
				test: /\.html$/i,
				use: ['html-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
		}),
	],
};
