const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');  //删除未引用代码的压缩工具
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.DefinePlugin({	// 为所有的依赖定义process.env.NODE_ENV
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
});