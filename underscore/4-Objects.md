## Objects
- `keys`/`allKeys`/`value`
    - `_.keys(object)`,检索object拥有的所有可枚举属性的名称，但不包含从原型链继承下来的
    - `_.allKeys(object)`,检索object拥有的和继承的所有属性的名称
    ```javascript
    function Student(name, age) {
        this.name = name;
        this.age = age;
    }
    Student.prototype.school = 'No.1 Middle School';
    var xiaoming = new Student('小明', 20);
    _.keys(xiaoming);   // ['name', 'age']
    _.allKeys(xiaoming);    // ['name', 'age', 'school']
    ```
    - `_.values(object)`,返回object对象所有的属性值，但不包含原型链继承的所有值
    ```javascript
    _.values({one: 1, two: 2, three: 3});   //[1,2,3]
    ```
- `mapObject`,针对objectd的map版本
```javascript
var obj = { a: 1, b: 2, c: 3 };
// 注意传入的函数签名，value在前，key在后:
_.mapObject(obj, (v, k) => 100 + v); // { a: 101, b: 102, c: 103 }
```
- `pairs`,把一个对象转变为一个`[key, value]`形式的数组
```javascript
_.pairs({one: 1, two: 2, three: 3});        //[["one", 1], ["two", 2], ["three", 3]]
```
- `invert`,返回一个object副本，把object的每个key-value来个交换。必须确保object里所有的值都是唯一的且可以序列号成字符串.
```javascript
var obj = {
    Adam: 90,
    Lisa: 85,
    Bart: 59
};
_.invert(obj); // { '59': 'Bart', '85': 'Lisa', '90': 'Adam' }
```
- `create`/`findKey`
- `function`,返回一个对象里所有的方法名, 而且是已经排序的.即对象里每个方法(属性值是一个函数)的名称
```javascript
_.functions(_); //["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
```
- `extend`/`extendOwn`
    - `_.extend(destination, *sources)`,把多个object的key-value合并到第一个object并返回，后面的对象属性会把前面的对象属性覆盖掉
    ```javascript
    var a = {name: 'Bob', age: 20};
    _.extend(a, {age: 15}, {age: 88, city: 'Beijing'}); 
    a; // {name: 'Bob', age: 88, city: 'Beijing'}
    ```
    - `_.extendOwn(destination, *sources)`,类似于 extend, 但只复制自己的属性覆盖到目标对象(不包括继承过来的属性)
- `pick`/`omit`/`defaults`
    - `_.pick(object, *keys)`,返回一个object副本，只过滤出keys(有效的键组成的数组)参数指定的属性值。或者接受一个判断函数，指定挑选哪个key。
    ```javascript
    _.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age');  //{name: 'moe', age: 50}
    _.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
        return _.isNumber(value);
    });         //{age: 50}
    ```
    - `_.omit(object, *keys)`,跟`pick`相反，只是过滤除去属性值
    ```javascript
    _.omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid');           // {name: 'moe', age: 50}
    _.omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
        return _.isNumber(value);
    });         // {name: 'moe', userid: 'moe1'}
    ``` 
    - `_.defaults(object, *defaults)`,用`defaults`对象填充`object`中的`undefined`属性。 并且返回这个`object`。一旦这个属性被填充，再使用`defaults`方法将不会有任何效果。
    ```javascript
    var iceCream = {flavor: "chocolate"};
    _.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});       
    ```
- `clone`,把原有对象的所有属性都复制到新的对象中，包括继承的属性.这是“浅复制”，就是说两个对象相同的`key`所引用的`value`其实是同一对象，即`c.age === b.age`为`true`
```javascript
function Person(){
    this.age = 88;
    this.city = 'beijing';
}
Person.prototype.hello = function(){
   return "hello";
}
var b = new Person();
var c = _.clone(b);         //{age: 88, city: "beijing", hello: ƒ}
```
- `tap`/`has`/`matcher`
- `property`/`propertyOf`
    - `_.property(key)`,返回一个函数，这个函数返回任何传入的对象的key属性
    ```javascript
    var stooge = {name: 'moe'};
    'moe' === _.property('name')(stooge);   //true
    ```
    - `_.propertyOf(object)`,需要一个对象，并返回一个函数,这个函数将返回一个提供的属性的值
    ```javascript
    var stooge = {name: 'moe'};
    _.propertyOf(stooge)('name');       //'moe'
    ```
- `isEqual`/`isMatch`/`isEmpty`/`isElement`/`isArray`/`isObject`/`isArguments`/`isFunction`/`isString`/`isNumber`/`isFinite`/`isBoolean`/`isDate`/`isRegExp`/`isError`/`isNaN`/`isNull`/`isUndefined`
    - `_.isEqual(object, other)`,执行两个对象之间的优化深度比较，确定他们是否应被视为相等
    ```javascript
    var o1 = { name: 'Bob', skills: { Java: 90, JavaScript: 99 }};
    var o2 = { name: 'Bob', skills: { JavaScript: 99, Java: 90 }};
    o1 === o2; // false
    _.isEqual(o1, o2); // true

    //也可以对Array进行比较
    var a1 = ['Bob', { skills: ['Java', 'JavaScript'] }];
    var a2 = ['Bob', { skills: ['Java', 'JavaScript'] }];
    a1 === a2; // false
    _.isEqual(a1, a2); // true
    ```
    - `_.isMatch(object, properties)`,检验`properties`中的键和值是否包含在`object`中
    ```javascript
    var stooge = {name: 'moe', age: 32};
    _.isMatch(stooge, {age: 32});       //true
    ```
    - `_.isEmpty(object)`,如果`object`不包含任何值，返回`true`。 对于字符串和类数组`（array-like）`对象，如果`length`属性为0，那么检查返回`true`

### 更多Arrays函数可以参考[网站](http://underscorejs.org/#objects)