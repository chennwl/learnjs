/**
 * 代码分离用配置文件
 */
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
	    index: './src/index.js',
	    another: './src/another-module.js'
	},
	plugins: [
	    new HTMLWebpackPlugin({
	      title: 'Code Splitting'
	    })
	    //4.0 已去除该配置
	    // new webpack.optimize.CommonsChunkPlugin({		// 可以将公共的依赖模块提取到已有的入口 chunk 中或一个新生成的 chunk
	    // 	name: 'common'		// 指定公共 bundle 名称
	    // })
	],
	output: {
	    filename: '[name].bundle.js',
	    path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			name: "commons"
		}
	}
}