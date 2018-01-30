/**
 * HTTP服务器架构
 */
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res){
    //解析请求，包括文件名
    var pathname = url.parse(req.url).pathname;
    //输出请求的文件名
    console.log("Request for " + pathname + " received");

    //从文件系统中读取请求的文件内容
    fs.readFile(pathname.substr(1), function (err, data) {  
        if(err){
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            // 响应文件内容
            res.write(data.toString());
        }
        //发送响应数据
        res.end();
    });
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080');