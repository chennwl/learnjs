import { clearTimeout } from "timers";

/*
*窗口的resize、scroll，输入框内容校验等操作时，如果这些操作处理函数较为复杂或页面频繁重渲染等操作时，如果事件触发的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时可以采用debounce（防抖）和throttle（节流）的方式来减少触发的频率，同时又不影响实际效果。
*/

/*
*debounce,当持续触发事件时，debounce会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件
*/
function debounce(fn,delay){
    var ctx,args,timer = null;

    var later = function(){
        fn.apply(ctx, args);
        //当事件真正执行后，清空定时器
        timer = null;
    };

    return function (){
        ctx = this;
        args = arguments;
        //当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
        if(timer){
            clearTimeout(timer);
            timer = null;
        }

        //重新设置事件触发的定时器
        timer = setTimeout(later, delay);
    }
}