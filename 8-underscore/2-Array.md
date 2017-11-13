## 数组函数（Array Function）
- `first`/`last`分别取第一个和最后一个元素
```javascript
var arr = [2, 4, 6, 8];
_.first(arr); // 2
_.last(arr); // 8
```
- `initial`/`rest`/`compact`
    - `_.initial(array, [n])`，返回数组中除了最后n个元素外的其他全部元素，n不填写的话默认是1
    ```javascript
    _.initial([5, 4, 3, 2, 1],3); //[5,4]
    ```
    - `_.index(array, [n])`，返回数组中除了前n个元素外的其他全部元素
    ```javascript
    _.index([5, 4, 3, 2, 1],3); //[2,1]
    ```
    - `_.compact(array)`，返回一个除去所有`false`值的`array`副本。 在javascript中,`false`,`null`,`0`,`""`,`undefined`和`NaN`都是`false`值.
    ```javascript
    _.compact([0, 1, false, 2, '', 3]); //[1,2,3]
    ```

- `flatten`接收一个`Array`，无论这个`Array`里面嵌套了多少个`Array`，`flatten()`最后都把它们变成一个一维数组。如果传递shallow参数，数组将只减少一维的嵌套
```javascript
_.flatten([1, [2], [3, [[4], [5]]]]); // [1, 2, 3, 4, 5]
_.flatten([1, [2], [3, [[4]]]], true); //true是 shallow参数，[1, 2, 3, [[4]]]
```
- `without`/`difference`/`union`传入的arrays并集/`intersection`传入的arrays交集/`uniq`数组去重
    - `_.without(array, *values)`，返回一个删除所有`value`值后的`array`副本（注：使用`===`表达式做相等测试。），value可以是多个
    ```javascript
    _.without([1, 2, 1, 0, 3, 1, 4], 0, 1); //[2,3,4]
    ```
    - `_.difference(array, *others)`，类似于`without`，但返回的值来自`array`参数数组，并且不存在于`other`数组.
    ```javascript
    _.difference([1, 2, 3, 4, 5], [5, 2, 10]); //[1,3,4]
    ```
- `zip`/`unzip`/`object`
    - `zip()`把两个或多个数组的所有元素按索引对齐，然后按索引合并成新数组
    ```javascript
    var names = ['Adam', 'Lisa', 'Bart'];
    var scores = [85, 92, 59];
    _.zip(names, scores);   // [['Adam', 85], ['Lisa', 92], ['Bart', 59]]
    ```
    - `unzip()`则是跟`zip`相反
    ```javascript
    var namesAndScores = [['Adam', 85], ['Lisa', 92], ['Bart', 59]];
    _.unzip(namesAndScores);    // [['Adam', 'Lisa', 'Bart'], [85, 92, 59]]
    ```
    - `object`，将数组转换为对象。传递任何一个单独`[key, value]`对的列表，或者一个键的列表和一个值的列表。
    ```javascript
    _.object(['moe', 'larry', 'curly'], [30, 40, 50]);   //{moe: 30, larry: 40, curly: 50}
    _.object([['moe', 30], ['larry', 40], ['curly', 50]]);  //{moe: 30, larry: 40, curly: 50}
    ```
- `indexOf`/`lastIndexOf`/`sortedIndex`/`findIndex`/`findLastIndex`
    - `_.sortedIndex(list, value, [iteratee], [context])`，使用二分查找确定`value`在`list`中的位置序号，`value`按此序号插入能保持`list`原有的排序。如果提供`iteratee`函数，`iteratee`将作为`list`排序的依据，包括传递的`value`。`iteratee`也可以是用字符串的属性名来排序(比如`length`)
    ```javascript
    _.sortedIndex([10, 20, 30, 40, 50], 35);    //3
    var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
    //按照age来排队
    _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');    //1
    ```
- `range`快速生成一个序列，不再需要用for循环实现
```javascript
// 从0开始小于10:
_.range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 从1开始小于11：
_.range(1, 11); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 从0开始小于30，步长5:
_.range(0, 30, 5); // [0, 5, 10, 15, 20, 25]

// 从0开始大于-10，步长-1:
_.range(0, -10, -1); // [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]

_.range(0); //[]
```
### Arrays函数可以参考[网站](http://underscorejs.org/#arrays)