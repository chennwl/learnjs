/**
 * Deferred对象
 */
var dtd = $.Deferred();     //新建一个deferred对象
var wait = function (dtd) {
    var task = function () {
        alert('执行完毕');
        dtd.resolve();  //改变执行状态为已完成
        //dtd.reject(); //改变执行状态为已失败
    }
    setTimeout(task, 5000);
    return dtd;
}

/**
 * $.when()参数为deferred（延迟）对象
 */
$.when(wait(dtd))
.done(function () { alert("哈哈哈，成功了") })
.fail(function () { alert("哈哈哈，失败了") });
dtd.resolve();


var wait = function () {
    var dtd = $.Deferred();     //新建一个deferred对象
    var  task = function(){
        alert('执行完毕');
        dtd.resolve();
    }
    setTimeout(task, 5000);

    return dtd.promise();   //没有参数时，返回一个新的deferred对象，该对象的运行状态无法被改变
}

$.when(wait())
.done(function () { alert("哈哈哈，成功了") }) //弹出了“执行完毕”再弹
.fail(function () { alert("哈哈哈，失败了") });