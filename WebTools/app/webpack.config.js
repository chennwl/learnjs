const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过npm安装的插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');	//用于访问内置插件

module.exports = {
  	entry: {
  		app: './src/index.js'		// string | object | array
  	},
  	devtool: 'inline-source-map',
  	devServer: {
	    contentBase: './dist',	//告诉开发服务器(dev server)，在哪里查找文件：
		port: 9000,
		hot: true
	},
   	module: {
     	rules: [
       		{
         		test: /\.css$/,
         		use: ['style-loader', 'css-loader']
       		}
     	]
    },
  	plugins: [
  	 	new CleanWebpackPlugin(['dist']),
  		new HtmlWebpackPlugin({
  			title: 'Output Management'
  		}),
  		new webpack.NamedModulesPlugin(),
     	new webpack.HotModuleReplacementPlugin()
  	],
 	output: {
    	filename: '[name].bundle.js',
    	path: path.resolve(__dirname, 'dist'),
    	publicPath: '/'
  	},
  	mode: 'development'
};