const merge = require('webpack-merge');		// 合并配置插件
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'inline-source-map',	//开发环境用
	devServer: {
	    contentBase: './dist',	//告诉开发服务器(dev server)，在哪里查找文件：
		port: 9000,
		hot: true     // 热更新所用
	},
	plugins: [
		new webpack.NamedModulesPlugin(),	// 查看要修补的依赖
     	new webpack.HotModuleReplacementPlugin(),
     	new webpack.DefinePlugin({	// 为所有的依赖定义process.env.NODE_ENV
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	]
});