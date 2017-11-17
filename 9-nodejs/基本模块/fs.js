var fs = require('fs');
// console.log(fs);
//读取utf-8的文本文件
// fs.readFile('demoFile.txt', 'utf-8', (err, data) => {     //文件路径是相对于process.cwd()当前工作目录的
//     if (err) throw err 
//     console.log(data);
// });
//读取二进制文件，图片
// fs.readFile('img.png', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         // var text = data.toString('utf-8');
//         console.log(data);
//         console.log(data.length + ' bytes');
//     }
// });

//覆盖写入文本
// var data = 'Hello,nodejs!';
// fs.writeFile('output.txt', data, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('ok.');
//         console.log("读取写入的数据！");
//         fs.readFile('output.txt', function (err, data) {
//             if (err) {
//                 return console.error(err);
//             }
//             console.log("异步读取文件数据: " + data.toString());
//         });
//     }
// });

//同步覆盖写入文本
// var data = 'Hello, Nodqweqwe.js';
// fs.writeFileSync('output.txt', data);

//追加写入文本
// var fs = require('fs');
// fs.appendFile('output.txt', '我会好好学习的', function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("数据写入成功！");
//     console.log("--------我是分割线-------------")
//     console.log("读取写入的数据！");
//     fs.readFile('output.txt', function (err, data) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log("异步读取文件数据: " + data.toString());
//     });
// });

//异步stat
// fs.stat('demoFile.txt', function (err, stat) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(stat);
//         // 是否是文件:
//         console.log('isFile: ' + stat.isFile());
//         // 是否是目录:
//         console.log('isDirectory: ' + stat.isDirectory());
//         if (stat.isFile()) {
//             // 文件大小:
//             console.log('size: ' + stat.size);
//             // 创建时间, Date对象:
//             console.log('birth time: ' + stat.birthtime);
//             // 修改时间, Date对象:
//             console.log('modified time: ' + stat.mtime);
//         }
//     }
// });

//同步statSync
// try{
//     var data = fs.statSync('demoFile.txt');
//     console.log(data);
// }catch(err){
//     console.log(err);
// }

//watch监听文件变化
// fs.watch('demoFile.txt', { encoding: 'buffer' }, function (eventType, filename) {       //监听器返回的对象是fs.FSWatcher。
//     if (filename) {
//         console.log(filename);
//         console.log(eventType);
//         // 输出: <Buffer ...>
//     }
// });

//图片读取
var http = require('http');
var content = fs.readFileSync('img.png', "binary");

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
    response.write(content, "binary");
    response.end();
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');

//删除文件
// fs.unlink('demoFile.txt',(err) => {
//     if(err) throw err;
//     console.log("成功删除");
// });