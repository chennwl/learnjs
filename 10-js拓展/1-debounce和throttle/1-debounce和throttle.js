/**
*在前端开发中有一部分的用户行为会频繁的触发事件执行，而对于DOM操作、资源加载等耗费性能的处理，很可能导致界面卡顿，甚至浏览器的崩溃。函数节流(throttle)和函数防抖(debounce)就是为了解决类似需求应运而生的
*/

/**
*debounce,函数防抖就是在函数需要频繁触发情况时，只有足够空闲的时间，才执行一次。好像公交司机会等人都上车后才出站一样
如实时搜索(keyup)，拖拽(mousemove)
*/
function debounce(method,delay){    //页面加载时绑定给onclick
    var timer = null;   //timer在页面一开始加载的时候就已经定义绑定了
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(context, args);
        }, delay);
    }
}

document.getElementById('debounce').onclick = debounce(function () { console.log('click') }, 2000);

/**
 * 函数节流就是预定一个函数只有在大于等于执行周期时才执行，周期内调用不执行。好像水滴攒到一定重量才会落下一样
 * 如窗口调整(resize)，页面滚动(scroll)，抢购疯狂点击(mousedown)
 */
function throttle(method, delay) {
    var last = 0;
    return function () {
        var now = +new Date();
        if (now - last > delay) {
            method.apply(this, arguments);
            last = now;
        }
    }
}

document.getElementById('throttle').onclick = throttle(function () { console.log('click') }, 2000);