'use strict'
var http = require('http');

//HTTP服务器
// var content = 'Hello!';
// var server = http.createServer(function(request,response){
//     console.log(request.method + ":" + request.url);
//     response.writeHead(200, {'Content-type': 'text/html'});
//     response.write(content,"utf-8");
//     response.end();
// }).listen(8080);

// console.log('create a server at: 127.0.0.1:8080');

var path = require('path');

//解析当前工作目录：
var workDir = path.resolve('.');
console.log(workDir);
// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'pub', 'index.html');
// '/learning/learnjs/pub/index.html'
console.log(filePath);
