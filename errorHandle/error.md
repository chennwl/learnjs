## 错误处理
- `try ... catch ... finally`是错误处理逻辑，`catch`和`finally`可以不必都出现。先执行`try`部分代码；出错了就执行`catch`部分代码，`e`为错误信息；`finally`无论程序对错一定会执行。
```javascript
try {
    ...
} catch (e) {
    ...
} finally {
    ...
}
```
- 错误类型：JavaScript有一个标准的`Error`对象表示错误，还有从`Error`派生的`TypeError`、`ReferenceError`等错误对象。我们在处理错误时，可以通过`catch(e)`捕获的变量`e`访问错误对象
- 抛出错误：程序也可以主动抛出一个错误，让执行流程直接跳转到`catch`块。抛出错误使用`throw`语句
```javascript
var r, n, s;
try {
    s = prompt('请输入一个数字');
    n = parseInt(s);
    if (isNaN(n)) {
        throw new Error('输入错误');    //抛出错误
    }
    // 计算平方:
    r = n * n;
    console.log(n + ' * ' + n + ' = ' + r);
} catch (e) {
    console.log('出错了：' + e);      //出错了：Error:输入错误
}

```
实际上，JavaScript允许抛出任意对象，包括数字、字符串。但是，最好还是抛出一个Error对象。

## 错误传播
- 如果在一个函数内部发生了错误，它自身没有捕获，错误就会被抛到外层调用函数，如果外层函数也没有捕获，该错误会一直沿着函数调用链向上抛出，直到被JavaScript引擎捕获，代码终止执行

## 异步错误处理
- 涉及到异步代码时，函数内部错误无法在调用时捕获，原因在于捕获的当时，回调函数并未执行
- 这时候就可以把`try...catch`错误处理代码写在函数内部
```javascript
$btn.click(function () {
    var
        x = parseFloat($('#x').val()),
        y = parseFloat($('#y').val()),
        r;
    try {
        if (isNaN(x) || isNaN(y)) {
            throw new Error('输入有误');
        }
        r = x + y;
        alert('计算结果：' + r);
    } catch (e) {
        alert('输入有误！');
    }
});
```