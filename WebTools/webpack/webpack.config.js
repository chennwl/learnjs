const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过npm安装的插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');	//用于访问内置插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');  //删除未引用代码的压缩工具

module.exports = {
  	entry: {
  		app: './src/index.js'		// string | object | array
  	},
  	devtool: 'inline-source-map',
  	devServer: {
	    contentBase: './dist',	//告诉开发服务器(dev server)，在哪里查找文件：
		  port: 9000,
		  hot: true     // 热更新所用
	  },
   	module: {
     	rules: [
       		{
         		test: /\.css$/,
         		use: ['style-loader', 'css-loader']
       		}
     	]
    },
  	plugins: [     // 插件
  	 	new CleanWebpackPlugin(['dist']),    // 构建前先清理一次 /dist 文件夹里面的内容
  		new HtmlWebpackPlugin({
  			title: 'Output Management'
  		}),
  		new webpack.NamedModulesPlugin(),   // 查看要修补的依赖
     	new webpack.HotModuleReplacementPlugin(),
      new UglifyJSPlugin()
  	],
 	  output: {
      filename: '[name].bundle.js',
    	path: path.resolve(__dirname, 'dist'),
    	publicPath: '/'
  	},
  	mode: 'development'
};