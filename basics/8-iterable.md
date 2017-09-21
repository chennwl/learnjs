## iterable
- `Map`和`Set`无法使用下标循环，所以ES6引入了`inteable`类型，`Array`、`Map`和`Set`都属于`iterable`类型
- 具有`iterable`类型的集合可以通过新的`for ... of`循环来遍历
```javascript
'use strict';
var a = ['A', 'B', 'C'];
var s = new Set(['A', 'B', 'C']);
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (var x of a) { // 遍历Array
    console.log(x);
}
for (var x of s) { // 遍历Set
    console.log(x);
}
for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}
```
- `for...of`循环完全修复了`for...in`的问题，只会循环集合本身的元素
- `iterable`内置`forEach`方法，也可以遍历
    - 以`Array`为例：
    ```javascript
    var a = ['A', 'B', 'C'];
    a.forEach(function (element, index, array) {
        // element: 指向当前元素的值
        // index: 指向当前索引
        // array: 指向Array对象本身
        alert(element);
    });
    ```
    - `Set`没有索引，回调函数的前两个参数都是元素本身
    - `Map`的回调函数参数依次为`value`、`key`和`map`本身
    ```javascript
    var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
    m.forEach(function (value, key, map) {
        alert(value);
    });
    ```