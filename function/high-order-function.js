'use strict';

//数组的高阶map()函数
function pow(x) {
    return x * x;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// var newArr = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
var newArr = arr.map(String); //['1', '2', '3', '4', '5', '6', '7', '8', '9']
console.log(newArr);

//map()和reduce()高阶函数结合函数
function string2int(s) {
    var arr = s.split(''),
        result;

    function num(m) {
        return m - 0; //减法能让字符串自动变为数字类型
    }
    arr = arr.map(num);
    result = arr.reduce(function(x, y) {
        return x * 10 + y;
    });
    return result;
}
// 测试:
if (string2int('12345') === 12345 && string2int('0') === 0 && string2int('12300') === 12300) {
    if (string2int.toString().indexOf('parseInt') !== -1) {
        console.log('请勿使用parseInt()!');
    } else if (string2int.toString().indexOf('Number') !== -1) {
        console.log('请勿使用Number()!');
    } else {
        console.log('测试通过!');
    }
} else {
    console.log('测试失败!');
}

//map用法
function normalize(arr) {
    var result;

    function turn(x) {
        x = x.substring(0, 1).toUpperCase() + x.substring(1).toLowerCase();
        return x;
    }
    result = arr.map(turn);
    return result;
}

//测试:
if (normalize(['adam', 'LISA', 'barT']).toString() === ['Adam', 'Lisa', 'Bart'].toString()) {
    console.log('测试通过!');
} else {
    console.log('测试失败!');
}

var $arr = ['1.1', '2.2e2', '3e300'],
    r;

r = $arr.map(str => parseInt(str, 10)); //箭头函数
// 通常使用parseInt时,只需要传递一个参数.
// 但实际上,parseInt可以有两个参数.第二个参数是进制数,可以通过语句"alert(parseInt.length)===2"来验证.
// console.log(parseInt.length); //2
// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素, 元素索引, 原数组本身.
// 第三个参数parseInt会忽视, 但第二个参数不会,也就是说,parseInt把传过来的索引值当成进制数来使用.从而返回了NaN.
console.log('[' + r[0] + ', ' + r[1] + ', ' + r[2] + ']');


//filter过滤器
function get_primes(arr) {
    return arr.filter(function(y) {
        if (y == 1) {
            return false;
        } else {
            var x, s;
            var a = [];
            for (x = 2; x < 100; x++) { a.push(x); }

            function pow(x) { return y % x; }
            s = a.map(pow);
            return y && s.indexOf(0) >= (y - 2)
        }
    });
}

// 测试:
var filter = {};
filter.arr = [];
for (var x = 1; x < 100; x++) {
    filter.arr.push(x);
}
filter.r = get_primes(filter.arr);
if (filter.r.toString() === [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].toString()) {
    console.log('测试通过!');
} else {
    console.log('测试失败: ' + filter.r.toString());
}