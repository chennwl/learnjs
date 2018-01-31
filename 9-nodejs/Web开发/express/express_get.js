/**
 * express GET
 */

 var app = require('express')();

 app.get('/', function (req, res) {  
    res.send('Root Page');
 });
 
 //访问服务端的静态资源用方法sendFile()
 app.get('/index', function (req, res) {  
    res.sendFile(__dirname + '/index.html');
 });

 //get参数接收
 app.get('/getUsers',function (req, res) {  
    var params = {
        //get参数是在请求query里面
        username: req.query.username,
        age: req.query.age
    }
     console.log(req.originalUrl);
    //  console.log(res.get());
    res.send(params);
 });

var server = app.listen(3000, function () {
    console.log("服务启动");
});