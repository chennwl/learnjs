const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
  		app: './src/index.js'		// string | object | array
  	},
  	plugins: [     // 插件
	 	new CleanWebpackPlugin(['dist']),    // 构建前先清理一次 /dist 文件夹
		new HtmlWebpackPlugin({
			title: 'Production'
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};