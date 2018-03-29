## Map和Set
- Map
    - JavaScript对象的键必须是字符串，为了解决不可以 **用Number或者其他数据类型作为键** 的问题，ES6引入了`Map`
    - 一组键值对的结构，具有极快的查找速度
    - 初始化`Map`需要一个二维数组，或者直接初始化一个空`Map`
    ```javascript
    var m = new Map(); // 空Map
    var m_1 = Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);       //以二维数组初始化
    m.set('Adam', 67); // 添加新的key-value set
    m.set('Bob', 59);
    m.has('Adam'); // 是否存在key 'Adam': true
    m.get('Adam'); // 67  get
    m.delete('Adam'); // 删除key 'Adam'  delete
    m.get('Adam'); // undefined
    ```
    - 一个Key只能对应一个value，多次对一个key放入value，后面的值会把前面的值冲掉
    ```javascript
    var m = new Map();
    m.set('Adam', 67);
    m.set('Adam', 88);
    m.get('Adam'); // 88
    ```
- Set
    - 一组key的集合，但不存储value，没有重复的Key
    - 创建一个Set，需要提供一个数组作为输入，或者直接创建一个空`Set`
    ```javascript
    var s1 = new Set(); // 空Set
    var s2 = new Set([1, 2, 3]); // 含1, 2, 3
    ```
    - 重复元素在`Set`中会被自动过滤
    - 通过`add(key)`方法可以添加元素到Set中，可以重复添加；通过`delete(key)`方法可以删除元素
    ```javascript
    var s = new Set([1,2,3]);
    s.add(4);
    console.log(s);     //Set { 1, 2, 3, 4 }
    s.add(4);       //Set { 1, 2, 3, 4 }没变化
    s.delete(3);
    s; // Set {1, 2, 4}
    ```