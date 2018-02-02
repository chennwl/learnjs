var socketServer = require('ws').Server;

//服务端开启一个服务 实例化socketServer
var wss = new socketServer({
    port: 8080
});

/**
 * 用express来开启WebSocket服务器
 */
// var app = reqire('express')();
// var server = require('http').Server(app);

// var wss = new socketServer({server: server, port: 8080});

//连接监听，当客户端连接到服务器时触发该事件
wss.on('connection', function (client) { 
    //消息接受监听，当客户端向服务端发送信息时触发该事件
    client.on('message', function (_message) {  
        var _messageObj = JSON.parse(_message);
        //status = 1 表示正常聊天
        _messageObj.status = 1;
        this.message = _messageObj;
        //把客户端的消息广播给所有在线的用户
        wss.broadcast(_messageObj);
    });

    //退出聊天
    client.on('close', function () {  
        try{
            this.message = this.message || {};
            // status = 0 表示退出聊天
            this.message.status = 0;
            //把客户端的消息广播给所有在线的用户
            wss.broadcast(this.message);
        }catch(e){
            consolg.log('刷新页面了');
        }
    });
});

wss.broadcast = function broadcast(_messageObj) { 
    //wss.clients为所有在线的用户 
    // console.log(wss.clients);
    wss.clients.forEach(function (client) {
        client.send(JSON.stringify(_messageObj));
    });
}