/**
 * 开启Socket服务器
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(88);    //端口为88

/**
 * connection: 监听客户端连接，回调函数会传递本次连接的socket
 * emit: 触发用客户端的事件
 */

io.on('connection', function (client) {  
    //将当前登录的用户保存到对象onlinePersons，并向所有在线的用户发起上线提示
    //serverLogin 为自定义事件，供客户端调用
    client.on('serverLogin', function (_person) {  
        var _personObj = JSON.parse(_person);
        onlinePersons[_personObj.id] = _personObj;
        //向所有在线的用户发起上线提示
        //触发客户端的clientTips事件
        // clientTips 为客户端的自定义事件
        io.emit('clientTips', JSON.stringify(onlinePersons));
    });

    //当监听到客户端有用户在移动，就向所有在线用户发起移动信息，触发客户端 clientMove 事件
    //serverMove 为自定义事件，供客户端使用
    client.on('serverMove', function (_person) {  
        var _personObj = JSON.parse(_person);
        onlinePersons[_personObj.id] = _personObj;
        console.log('serverLogin', onlinePersons);
        //clientTips 为客户端的自定义事件
        io.emit('clientTips', _person);
    });
});