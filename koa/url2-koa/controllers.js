const fs = require('fs');   //导入fs模块

//创建router路由
function addMapping(router, mapping){
    for(var url in mapping){
        if(url.startsWith('GET ')){  //GET路径方法
            var path = url.substring(4);
            router.get(path, mapping[url]);     //mapping[url]为该路径的异步处理方法，即async(ctx, next) => {}
            console.log(`register URL mapping: GET ${path}`);
        } else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else{
            console.log(`invalid URL: ${url}`);
        }
    }
}

//扫描目录
function addControllers(router, dir) {
    //用readdirSync列出文件，这里可以用sync是因为启动时只运行一次，不存在性能问题
    //__dirname:当前模块的目录名; __filename:当前模块文件的带有完整绝对路径的文件名
    var files = fs.readdirSync(__dirname + '/' + dir);

    //过滤出.js文件:
    var js_files = files.filter((f) => {
        return f.endsWith('.js');   //endsWith:判断当前字符串是否是以另外一个给定的子字符串“结尾”的，startsWith()同理
    });

    //处理每个js文件
    for(var f of js_files){     //es6循环方式
        console.log(`process controller: ${f}...`);         //f为controllers里面的js文件
        let mapping = require(__dirname + '/' + dir + '/' + f);     //导入js模块文件
        console.log(mapping);   //mapping就是module.exports暴露出的对象
        addMapping(router, mapping);    //对js模块文件暴露出来的URL进行处理
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();       //require('koa-router')返回的是函数
    addControllers(router, controllers_dir);
    return router.routes();
}