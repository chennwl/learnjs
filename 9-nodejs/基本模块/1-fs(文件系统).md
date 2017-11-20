## fs(文件系统)
- `fs`模块就是文件系统模块，负责读写文件
- 异步与同步
    - 异步方法的最后一个参数都是一个回调函数。传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常`error`。 如果操作成功完成，则第一个参数会是`null`或`undefined`。
    - 当使用同步方法时，任何异常都会被立即抛出。 可以使用`try/catch`来处理异常，或让异常向上冒泡。同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。
- 读取文件
    - 异步`fs.readFile()`
        - 读取文本文件
        ```javascript
        var fs = require('fs');
        //读取文件编码是utf-8的demoFile.txt文件
        fs.readFile('demoFile.txt', 'utf-8', (err, data) => {     //文件路径是相对于process.cwd()当前工作目录的
            if (err) {
                console.log(err);       //nodejs第一个参数都是错误信息
            } else {
                console.log(data);
            }
        });
        ```
        - 读取二进制文件
        ```javascript
        var fs = require('fs');
        fs.readFile('img.png', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);      //data返回Buffer对象,一个包含零个或任意个字节的数组（注意和Array不同）
                console.log(data.length + ' bytes');
            }
        });

        //Buffer对象可以和String作转换
        
        // Buffer -> String
        var text = data.toString('utf-8');
        console.log(text);

        // String -> Buffer
        var buf = Buffer.from(text, 'utf-8');
        console.log(buf);
        ```
        - 图片读取完后如果需要在浏览器中显示，就要先搭建`web`服务，然后把以字节方式读取的图片在浏览器中渲染
            1. 图片读取是以字节的方式
            2. 图片在浏览器的渲染因为没有`img`标签，所以需要设置响应头为image
            ```javascript
            var fs = require('fs');
            var http = require('http');
            var content = fs.readFileSync('img.png', "binary");     //binary为二进制的意思

            http.createServer(function (request, response) {
                //发送一个响应头给请求，将HTTP响应200写入response，同时设置Content-Type: image/jpeg
                response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                response.write(content, "binary");
                response.end();
            }).listen(8888);

            console.log('Server running at http://127.0.0.1:8888/');
            ```
    - 同步读取的函数和异步函数相比，多了一个`Sync`后缀，并且不接收回调函数，函数直接返回结果。
    ```javascript
    var fs = require('fs');
    var data = fs.readFileSync('demoFile.txt', 'utf-8');
    console.log(data);

    //读取文件发生错误，则需要用try...catch捕获该错误
    try {
    var data = fs.readFileSync('demoFile.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        // 出错了
    }
    ```
- 覆盖写入文本
    - 异步`fs.writeFile()`，函数参数依次为文件名，数据和回调函数。如果传入的数据是`String`，默认按`UTF-8`编码写入文本文件，如果传入的参数是`Buffer`，则写入的是二进制文件
    ```javascript
    var fs = require('fs');
    var data = 'Hello, Node.js';
    //每次写入文本都会覆盖之前的文本内容
    fs.writeFile('output.txt', data, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok.');
        }
    });
    ```
    - 同步`fs.writeFileSync()`
    ```javascript
    var fs = require('fs');
    var data = 'Hello, Node.js';
    fs.writeFileSync('output.txt', data);
    ```
- 追加写入文本
```javascript
var fs = require('fs');
fs.appendFile('output.txt', '我会好好学习你的', function (err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('output.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```
- 获取文件或目录的详细信息，如大小，创建时间等
    - 异步,`fs.stat()`回调函数返回一个Stat对象
    ```javascript
    var fs = require('fs');
    fs.stat('demoFile.txt', function (err, stat) {
        if (err) {
            console.log(err);
        } else {
            // 是否是文件:
            console.log('isFile: ' + stat.isFile());
            // 是否是目录:
            console.log('isDirectory: ' + stat.isDirectory());
            if (stat.isFile()) {
                // 文件大小:
                console.log('size: ' + stat.size);
                // 创建时间, Date对象:
                console.log('birth time: ' + stat.birthtime);
                // 修改时间, Date对象:
                console.log('modified time: ' + stat.mtime);
            }
        }
    });
    ```
    - 同步,`fs.statSync()`
    ```javascript
    var stat = fs.statSync('demoFile.txt');   //stat对象就是异步回调函数里面的那一个
    ```
- `fs.watch(filename[, options][, listener])`,监听fileaname的变化, 返回的对象是一个`fs.FSWatcher`。
    - `options <string> | <Object>`,参数可选，当参数是字符串时，则是指定了encoding
        - `persistent <boolean>`指明如果文件正在被监视，进程是否应该继续运行。默认` = true`
        - `recursive <boolean>`指明是否全部子目录应该被监视，或只是当前目录。 适用于当一个目录被指定时，且只在支持的平台（详见 Caveats）。默认` = false`
        - `encoding <string>`指定用于传给监听器的文件名的字符编码。默认` = 'utf8'`
    - `listener <Function> | <undefined> Default: undefined`
        - `eventType <string>`,`rename`或`change`事件
        - `filename <string> | <Buffer>`
        ```javascript
        fs.watch('demoFile.txt', { encoding: 'buffer' }, function (eventType, filename) {       //监听器返回的对象是fs.FSWatcher。
            if (filename) {
                console.log(filename);
                console.log(eventType);
                // 输出: <Buffer ...>
            }
        });
        ```

### 更多fs方法可以参考[网址](http://nodejs.cn/api/fs.html)

