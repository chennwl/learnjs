// var app = require('./module');
// console.log(app);
// app.hello();

// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
    console.log('nextTick callback!');
});
console.log('nextTick was set!');


process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});