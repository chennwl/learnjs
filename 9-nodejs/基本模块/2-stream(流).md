## stream(流)
- 流在nodejs中是处理流数据的抽象接口
- 流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位。
- 流也是一个对象，`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。
    - 流的示例
    ```javascript
    //从文件流读取文本内容
    var fs = require('fs');

    // 打开一个流:
    var rs = fs.createReadStream('sample.txt', 'utf-8');

    rs.on('data', function (chunk) {        //data事件可能会有多次，每次传递的chunk是流的一部分数据
        console.log('DATA:')
        console.log(chunk);
    });

    rs.on('end', function () {
        console.log('END');
    });

    rs.on('error', function (err) {
        console.log('ERROR: ' + err);
    });

    //以流的形式写入文件
    var fs = require('fs');

    var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
    ws1.write('使用Stream写入文本数据...\n');
    ws1.write('END.');
    ws1.end();

    var ws2 = fs.createWriteStream('output2.txt');
    ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
    ws2.write(new Buffer('END.', 'utf-8'));
    ws2.end();
    ```
    - 所有可以读取数据的流都继承自`stream.Readable`，所有可以写入的流都继承自`stream.Writable`。
- 一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。`Readable`流就有一个`pipe`方法
```javascript
//用pipe()把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序
var fs = require('fs');

var rs = fs.createReadStream('demoFile.txt');
var ws = fs.createWriteStream('copied.txt');
rs.pipe(ws);

//默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果不希望自动关闭Writable流，需要传入参数：
readable.pipe(writable, { end: false });
```