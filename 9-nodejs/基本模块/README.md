## 基本模块
- 在Node.js环境中，唯一的全局对象叫`global`
- `process`也是Node.js提供的一个对象，它代表当前Node.js进程。通过`process`对象可以拿到许多有用信息
```javascript
> process === global.process;
true
> process.version;
'v5.2.0'
> process.platform;
'darwin'
> process.arch;
'x64'
> process.cwd(); //返回当前工作目录
'/Users/michael'
> process.chdir('/private/tmp'); // 切换当前工作目录
undefined
> process.cwd();
'/private/tmp'
```
- JavaScript程序是由事件驱动执行的单线程模型,Node.js不断执行响应事件的JavaScript函数，直到没有任何响应事件的函数可以执行时，Node.js就退出了。如果想要在下一次事件响应中执行代码，可以调用`process.nextTick()`
```javascript
// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
    console.log('nextTick callback!');  //下一次事件循环在执行
});
console.log('nextTick was set!');       //先执行
```
- Node.js进程本身的事件就由`process`对象来处理。如果响应`exit`事件，就可以在程序即将退出时执行某个回调函数
```javascript
// 程序即将退出时的回调函数:
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});
```
- 常用内置模块
    - fs
    - stream
    - http
    - crypto