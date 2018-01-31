/**
 * express post参数接受
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 设置静态文件路径
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(express.static('public'));

app.get('/index.html', function (req, res) {  
    res.sendFile(__dirname + '/index.html');
});

//创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/process_post', urlencodedParser, function (request, response) {  
    var params = {
        //post参数在请求体里面
        "first_name": request.body.first_name,
        "last_name": request.body.last_name
    }
    console.log(params);
    response.end(JSON.stringify(params));
});

var server = app.listen(3000, function () {  
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});