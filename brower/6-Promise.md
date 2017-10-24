## Promise
- JS是单线程执行的，所以JS的所有网络操作，浏览器事件都必须用回调函数实现异步执行
- `Promise`最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰地分离
- `Promise`还可以串行执行异步任务，如`job1.then(job2).then(job3).catch(handleError);`，其中，`job1`、`job2`和`job3`都是Promise对象。任何任务失败则不再继续并执行错误处理函数
```javascript
// 0.5秒后返回input*input的计算结果:
function multiply(input) {
    return new Promise(function (resolve, reject) {
        log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);    //第三个以后的参数是作为第一个函数的参数来运行
    });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new Promise(function (resolve, reject) {
        log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    });
}

var p = new Promise(function (resolve, reject) {
    log('start new Promise...');
    resolve(123);
});

p.then(multiply)    //calculating 123 x 123...，这里是程序一运行就执行的，resolve函数是mutiply函数,input就是123
 .then(add)         //calculating 15129 + 15129...
 .then(multiply)    //calculating 30258 x 30258...
 .then(add)         //calculating 915546564 + 915546564...
 .then(function (result) {
    log('Got value: ' + result);        //Got value: 1831093128
});
```
- Promise可以并行执行异步任务
```javascript
//任务并行执行，用Primise.all()实现
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // 获得一个Array: ['P1', 'P2']
});

//只需要获得先返回的结果用，Promise.race()实现
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    //由于p1执行较快，Promise的then()将获得结果'P1'。p2仍在继续执行，但执行结果将被丢
    console.log(result); // 'P1'
});
```