// 'use strict'
// var http = require('http');

// /*HTTP服务器*/
// // var content = 'Hello!';
// // var server = http.createServer(function(request,response){
// //     console.log(request.method + ":" + request.url);
// //     response.writeHead(200, {'Content-type': 'text/html'});
// //     response.write(content,"utf-8");
// //     response.end();
// // }).listen(8080);

// // console.log('Server is running at: 127.0.0.1:8080');

// //path模块处理本地文件目录
// var path = require('path');

// //解析当前工作目录：
// var workDir = path.resolve('.');
// console.log(workDir);
// // 组合完整的文件路径:当前目录+'pub'+'index.html':
// var filePath = path.join(workDir, 'pub', 'index.html');
// // '/learning/learnjs/pub/index.html'
// console.log(filePath);



/*文件服务器*/
var 
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');
//从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir:' + root);

//创建服务器
var server = http.createServer(function(req,res){
    //获取URL的path，类似'/css/bootstrap.css':
    var pathname = url.parse(req.url).pathname;
    //获取对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    //获取文件状态
    fs.stat(filepath, function(err,stats){
        if(!err && stats.isFile()){ //判断路径是否是文件
            success(filepath,req,res);
        }else if(!err && stats.isDirectory()){      //判断路径是否是目录
            var $index = path.join(root,'index.html');
            var $default = path.join(root,'default.html');

            if(fs.existsSync($index)){      //判断是否存在这个文件
                success($index,req, res);
            }else if(fs.existsSync($default)){
                success($default, req, res);
            }
        }else{
            fail(req.res);
        }
    });
});

function success(path, request, response){
    //没有出错且存在:
    console.log('200 ' + request.url);
    //发送200响应:
    response.writeHead(200);
    //将文件流导向response:
    //response对象本身是一个Writable Stream，直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应。
    fs.createReadStream(path).pipe(response);
}

function fail(request, response){
    //出错了或者文件不存在:
    console.log('404 ' + request.url);
    //发送404响应:
    response.writeHead(404);
    response.end('404 NOT FOUND');
}

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/' );