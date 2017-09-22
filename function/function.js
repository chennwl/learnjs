'use strict'
//arguments
// function foo(x) {
//     console.log(x); // 10
//     for (var i = 0; i < arguments.length; i++) {
//         console.log(arguments[i]); // 10, 20, 30
//     }
// }
// foo(10, 20, 30);

//rest
// function foo(a, b, ...rest) {
//     console.log('a = ' + a);
//     console.log('b = ' + b);
//     console.log(rest);
// }
// foo(1, 2, 3, 4, 5);
// // 结果:
// // a = 1
// // b = 2
// // Array [ 3, 4, 5 ]
// foo(1);
// // 结果:
// // a = 1
// // b = undefined
// // Array []

function area_of_circle(r, pi) {
    var result = 0,
        p = 3.14;
    if (arguments['1'] !== undefined) {
        p = pi;
    }
    result = r * r * p;
    return result;
}
if (area_of_circle(2) === 12.56 && area_of_circle(2, 3.1416) === 12.5664) {
    console.log('测试通过');
} else {
    console.log('测试失败');
}

//变量提升
// function foo() {
//     var x = 'Hello, ' + y; //Hello, undefined
//     console.log(x);
//     var y = 'Bob';
// }
// foo();

//let const 局部作用域
// function foo() {
//     for (var i = 0; i < 100; i++) {
//         //
//     }
//     i += 100; // 仍然可以引用变量i
//     console.log(i); //200
// }
// foo();

//apply()和call()方法
function getAge() {
    var y = new Date().getFullYear();
    console.log(y - this.birth);
}
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};
xiaoming.age(); // 25
// getAge();       //Cannot read property 'birth' of undefined
getAge.apply(xiaoming, []);

//数组的高阶map()函数
// function pow(x) {
//     return x * x;
// }

// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// // var newArr = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
// var newArr = arr.map(String); //['1', '2', '3', '4', '5', '6', '7', '8', '9']
// console.log(newArr);

//map()和reduce()高阶函数结合函数
function string2int(s) {
    var arr = [],
        result;

    for (let i = 0; i < s.length; i++) {
        arr.push(s[i]);
    }

    function num(m) {
        return (m - 0); //减法能让字符串变为Number类型
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