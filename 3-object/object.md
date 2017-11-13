## 对象(Object)
-  用`typof`可以判断`number`、`string`、`boolean`、`function`和`undefined`的类型与对应的名字一样，返回一个字符串；而`null`、`Array`和传统意义的`object`返回的都是`object`
- 包装对象
    - `number`、`boolean`和`string`都有包装对象。包装对象用`new`创建，用`new`创建的变量会变为`object`了
    - 如果没有用`new`初始化，`Number()`、`Boolean`和`String()`都被当做普通函数，把任何类型的数据转换为`number`、`boolean`和`string`类型
    ```javascript
    var n = Number('123'); // 123，相当于parseInt()或parseFloat()
    typeof n; // 'number'

    var b = Boolean('true'); // true
    typeof b; // 'boolean'

    var b2 = Boolean('false'); // true! 'false'字符串转换结果为true！因为它是非空字符串！
    var b3 = Boolean(''); // false

    var s = String(123.45); // '123.45'
    typeof s; // 'string'
    ```
- 可以用`parseInt()`或`parseFloat()`可以来转换任意类型到`number`
- 可以用`String()`来转换任意类型到`string`，或者直接调用某个对象的`toString()`方法，`null`和`undefined`没有`toString()`方法
- 通常不必把任意类型转换为`boolean`再判断，因为可以直接写`if (myVar) {...}`；
- 判断`Array`要使用`Array.isArray(arr)`；
- 判断`null`要使用`myVar === null`；
- 判断某个全局变量是否存在用`typeof window.myVar === 'undefined'`；
- 函数内部判断某个变量是否存在用`typeof myVar === 'undefined'`。
- `number`对象调用`toString()`要特殊处理
```javascript
123.toString(); // SyntaxError
123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'
```