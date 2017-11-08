## underscore
- `Underscore` 是一个 JavaScript 工具库，它提供了一整套函数式编程的实用功能，[Underscore.js中文文档](http://www.bootcss.com/p/underscore/);

## Collections，这是集合类，指的是Array和Object都可以使用的方法，暂不支持Map和Set
- `each`/`map`/`reduce`/`filter`/`find`/`reject`不但可以作用于Array，还可以作用于Object，此时，传入的参数为`function(value,key)`
```javascript
//each _.each(list,iteratee,[context])
_.each([1, 2, 3], alert);   //alerts each number in turn...

//map _.map(list,iteratee,[context])跟原生map方法类似，返回的是数组Array
_.map([1, 2, 3], function(num){ return num * 3; });     //[3, 6, 9]
_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; }); //[3, 6, 9]

//reduce _.reduce(list,iteratee,[memo],[context])，把list中元素归结为一个单独的数值。若没有memo传递给reduce的初始调用，第一个元素将取代传递给列表中下一个元素调用函数的memo参数。
var sum = _.reduce([1, 2, 3], (memo, num) => { return memo + num; }, 10); //16
var sum = _.reduce([1, 2, 3], (memo, num) => { return memo + num; }); //6

//filter _.filter(list, predicate, [context])，遍历list中的每个值，返回包含所有通过predicate真值检测的元素值。
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); //[2, 4, 6]

//find 在list中逐项查找，整个都找不到返回undefined，找到第一个就马上返回，不会遍历整个   list
var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }); //2

//reject 与filter相反
```
- `every`/`some`/`contains`
    - 当集合的所有元素都满足条件时，`_.every()`函数返回`true`
    ```javascript
    _.every([1, 4, 7, -3, -9], (x) => x > 0); // false
    ```
    - 当集合的至少一个元素满足条件时，`_.some()`函数返回`true`
    ```javascript
    _.some([1, 4, 7, -3, -9], (x) => x > 0); // true
    ```
    - `_.contains(list,value)`，如果list包含指定的`value`则返回`true`（注：使用===检测）
    ```javascript
    _.contains([1, 2, 3], 3);       //true
    ```
- `max`/`min`直接返回集合中最大和最小的数。如果集合是Object，两个函数只作用于value
```javascript
var arr = [3, 5, 7, 9];
_.max(arr); // 9
_.min(arr); // 3

// 空集合会返回-Infinity和Infinity，所以要先判断集合不为空：
_.max([])
-Infinity
_.min([])
Infinity

//集合是Object
_.max({ a: 1, b: 2, c: 3 }); // 3   
```
- `sortBy`/`groupBy`/`indexBy`/`countBy`
    - `_.sortBy(list, iteratee, [context])`，返回排序后的list拷贝副本
    ```javascript
    _.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });   //[5, 4, 6, 3, 1, 2]
    ```
    - `_.groupBy(list, iteratee, [context])`，把一个集合分组为多个集合，通过迭代器返回的结果进行分组
    ```javascript
    var scores = [20, 81, 75, 40, 91, 59, 77, 66, 72, 88, 99];
    var groups = _.groupBy(scores, function (x) {
        if (x < 60) {
            return 'C';
        } else if (x < 80) {
            return 'B';
        } else {
            return 'A';
        }
    });
    // 结果:
    // {
    //   A: [81, 91, 88, 99],
    //   B: [75, 77, 66, 72],
    //   C: [20, 40, 59]
    // }
    ```
    - `_.indexBy(list, iteratee, [context])`，和`groupBy`非常像，当键是唯一的时候可以使用`indexBy`
    ```javascript
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    _.indexBy(stooges, 'age');
    //结果：
    // {
    //    "40": {name: 'moe', age: 40},
    //    "50": {name: 'larry', age: 50},
    //    "60": {name: 'curly', age: 60}
    // }
    ```
    - `_.countBy(list, iteratee, [context])`，类似groupBy，但是不是返回列表的值，而是返回在该组中值的数目。
    ```javascript
    _.countBy([1, 2, 3, 4, 5], function(num) {
        return num % 2 == 0 ? 'even': 'odd';
    });
    //{odd: 3, even: 2}
    ```
- `shuffle`/`sample`
    - `shuffle()`用洗牌算法随机打乱一个集合
    ```javascript
    // 注意每次结果都不一样：
    _.shuffle([1, 2, 3, 4, 5, 6]); // [3, 5, 4, 6, 2, 1]
    ```
    - `sample()`则是随机选择一个或多个元素
    ```javascript
    // 注意每次结果都不一样：
    // 随机选1个：
    _.sample([1, 2, 3, 4, 5, 6]); // 2
    // 随机选3个：
    _.sample([1, 2, 3, 4, 5, 6], 3); // [6, 1, 4]
    ```
- `toArray`/`size`/`partition`
    - `_.toArray(list)`
    ```javascript
    (function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4); //[2,3,4]
    ```
    - `_.size(list)`
    ```javascript
    _.size({one: 1, two: 2, three: 3});     //3
    ```
    - `_.partition(array, predicate)`，拆分一个数组（array）为两个数组：第一个数组其元素都满足predicate迭代函数，而第二个的所有元素均不能满足predicate迭代函数
    ```javascript
    _.partition([0, 1, 2, 3, 4, 5], isOdd); //[[1, 3, 5], [0, 2, 4]]
    ```
### 更多Collections函数可以[参考](http://underscorejs.org/#collections)