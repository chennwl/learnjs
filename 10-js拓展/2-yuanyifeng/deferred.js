/**
 * Deferred对象
 */
var dtd = $.Deferred();     //新建一个deferred对象

var wait = function (dtd) {  
    var  task = function(){
        alert('执行完毕');
        dtd.resolve();
    }
    
}