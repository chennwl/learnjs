## generator
- 协程：多个线程互相协作，完成异步任务。
    - `yield`命令是异步两个阶段的分界线
    - Generator函数是协程在ES6的实现，最大特点就是可以交出函数的执行权（即暂停执行）
- **generator**函数名前面要加`*`号，以示区别。
- 直接调用generator函数只会产生一个generator对象，调用generator对象有两个方法
    - 不断地调用generator对象的`next()`方法
    ```javascript
    function* fib(max) {
        var
            t,
            a = 0,
            b = 1,
            n = 1;
        while (n < max) {
            yield a;
            t = a + b;
            a = b;
            b = t;
            n ++;
        }
        return a;
    }
    var f = fib(5);
    f.next(); // {value: 0, done: false}
    f.next(); // {value: 1, done: false}
    f.next(); // {value: 1, done: false}
    f.next(); // {value: 2, done: false}
    f.next(); // {value: 3, done: true}
    f.next(); //{ value: undefined, done: true }
    ```
    在这里，直接调用Generator函数，会返回一个内部指针f，即执行它不会返回结果，返回的是指针对象。调用指针f的`next()`方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的`yield`语句并返回结果。  
    **总结：`next()`方法的作用是分阶段执行Generator函数。每次调用`next()`方法，会返回一个对象，表示当前阶段的信息（`value`属性和`done`属性）。`value`属性是 `yield`语句后面表达式的值，表示当前阶段的值；`done`属性是一个布尔值，表示Generator函数是否执行完毕，即是否还有下一个阶段。当`done`为`true`时，generator对象就已经全部执行完毕。** 

    - 直接用`for ... of`循环迭代generator对象，这种方式不需要判断`done`
    ```javascript
    for (var x of fib(5)) {
        console.log(x); // 依次输出0, 1, 1, 2, 3
    }
    ```
- generator函数的数据交换和错误处理
    - 数据交换：`next()`方法返回值的`value`属性，是Generator函数向外输出数据；`next()`方法还可以接受参数，这是向Generator函数体内输入数据。
    ```javascript
    function* gen(x){
    var y = yield x + 2;
    return y;
    }
    var g = gen(1);
    g.next()    //{ value: 3, done: false }     返回x+2的值(3)
    g.next(2)   // { value: 2, done: true }     传入的参数2会被generator函数内的变量y接收，因此value返回的就是2
    ```
    - 错误处理：generator函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。
    ```javascript
    function* gen(x) {
        try {
            var y = yield x + 2;
        } catch (e) {
            console.log(e);         //处理错误的代码
        }
        return y;
    }
    var g = gen(1);
    g.next();
    g.throw('出错了');     //出错了 -- 出错代码
    ```
    上诉代码当中，在generator函数体外，使用指针对象的`throw`方法抛出的错误，可以被函数体内的`try ... catch`代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的
- generator函数的用法
```javascript
var fetch = require('node-fetch');
function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
//generator函数封装了一个异步操作，该操作先读取一个异步接口，然后从JSON格式的数据解析信息
//执行上面这段代码
var g = gen();
var result = g.next();
result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```
在执行代码中，首先执行Generator函数，获取遍历器对象，然后使用`next()`方法，执行异步任务的第一阶段。由于`Fetch`模块返回的是一个`Promise`对象，因此要用 `then`方法调用下一个`next()`方法。
