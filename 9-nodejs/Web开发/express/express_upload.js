/**
 * POST上传文件
 */
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');

//dest的属性为文件上传后存放的文件夹，存放的是上传后生成二进制文件
var upload = multer({dest: path.join(__dirname, 'temp')});

//使用中间件
app.use(express.static('public'));      //托管静态文件
app.use(bodyParser.urlencoded({extended: false}));
/**
 * 注意上传界面中的 <input type="file" name="image"/>中的name必须是下面代码中指定的名称
 * 这种写法也可以，同时这也是多文件上传
**/
// app.use(multer({ dest: "/temp/" }).array("image"));      //使用中间件

app.get('/upload.html', function (req, res) {  
    res.sendFile(__dirname + "/upload.html");
});

//单文件上传 singal
//注意上传界面中的 <input type="file" name="avatar"/>中的name必须是下面代码中指定的名称
app.post('/file_upload', upload.single('avatar'), function (req, res, next) {  
    console.log(req.file);  //上传的文件信息，因为是一个，所以不需要用req.files[0]

    var des_file = __dirname + "/" + req.file.originalname;
    fs.readFile(req.file.path, function (err, data) {  
        //写入文件，写入数据为上传后的文件，存放路径为当前文件夹下
        fs.writeFile(des_file, data, function (err) {  
            if (err) {
                console.log(err);
            }else{
                response = {
                    message: 'File uploaded successfully',
                    filename: req.file.originalname
                }
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

//多文件上传 array
//注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名称
// '/mulUpload'为form表单action的地址或者$.post的地址 
app.post('/mulUpload', upload.array('photos', 12), function (req, res, next) {
    console.log(req.files);
    console.log(req.body);
    res.end(req.file + "<br/><br/>" + req.body);
}) 


var server = app.listen('3000', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});