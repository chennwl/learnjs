'use strict'
//字符串
var name = '小明';
var age = 20;
console.log(`你好, ${name}, 你今年${age}岁了!`);
//字符串的减法
var a = "2",
    b = "1";
console.log(a - b); //1
//对象
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};
console.log('name' in xiaoming); // true
console.log('grade' in xiaoming); // false
console.log('toString' in xiaoming); // true
console.log(xiaoming.toString) //function

//Map和Set
// var m = new Map(); //空Map
// var s = new Set();

// m.set('Adam', 67); // 添加新的key-value
// m.set('Bob', 59);
// m.has('Adam'); // 是否存在key 'Adam': true
// m.delete('Adam'); // 删除key 'Adam'
// m.get('Adam'); // undefined

// var s = new Set([1, 2, 3]);
// s.add(4);
// console.log(s); //Set { 1, 2, 3, 4 }

var a = ['A', 'B', 'C'];
a.name = 'Hello';
// for (var x of a) {       //只循环集合本身的元素
//     console.log(x); // 'A', 'B', 'C'
// }
// console.log(a.length); //3
var s = new Set(['a', 'b', 'c']);
var m = new Map([
    [1, 'x'],
    [2, 'y'],
    [3, 'z']
]);
for (var x of a) { // 遍历Array
    console.log(x);
}
for (var x of s) { // 遍历Set
    console.log(x);
}
for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}
//forEach
a.forEach(function(element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element);
});

m.forEach(function(value, key, map) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(value); //x y z
});