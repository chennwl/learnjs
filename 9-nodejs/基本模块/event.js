/**
 * event模块
 */

var EventEmitter = require('events').EventEmitter;
// var event = new EventEmitter();
// event.on('some_event', function () { 
//     console.log('some_event触发');
// });

// setTimeout(() => {
//     event.emit('some_event');   //1s后触发事件
// }, 1000);

/**
 * emitter 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件
 */
var emitter = new EventEmitter();
emitter.on('someEvent', function (arg1, arg2) {
    console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', function (arg1, arg2) { //也可以用addListener(),removeListener()是移除监听事件
    console.log('listener2', arg1, arg2);
});
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');    //两个事件监听器回调函数被先后调用

/**
 * 方法
 */
// addListener(event, listener) 为指定事件添加一个监听器到监听器数组的尾部。
// on(event, listener) 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
// once(event, listener) 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
// removeListener(event, listener) 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称
// removeAllListeners([event]) 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
// setMaxListeners(n) 默认情况下， EventEmitters 如果添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
// listeners(event) 返回指定事件的监听器数组。
// emit(event, [arg1], [arg2], [...]) 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

/**
 * 类方法
 */
// listenerCount(emitter, event) 返回指定事件的监听器数量。

/**
 * 事件
 */
// newListener EventEmitter 实例会在一个监听器被添加到其内部监听器数组之前触发自身的 'newListener' 事件，类似于click之类的用法，有两个参数分别为event和listener
const myEmitter = new EventEmitter();
// 只处理一次，所以不会无限循环
myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
        // 在开头插入一个新的监听器
        myEmitter.on('event', () => {
            console.log('B'); //先打印B
        });
    }
});
myEmitter.on('event', () => {
    console.log('A');   //后打印A
});
myEmitter.emit('event');

// removeListener   listener 被移除后触发