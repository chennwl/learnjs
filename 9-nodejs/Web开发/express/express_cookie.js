/**
 * Cookie 管理
 */
var app = require('express')();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function (req, res) {  
    console.log("Cookies: ", req.cookies);  // req.cookies是对象，不能用+号
});

app.listen(3000);