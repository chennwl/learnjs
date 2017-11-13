## 实用功能(Utility Functions)
- `noConflict`,放弃Underscore 的控制变量"_"。返回Underscore对象的引用。
```javascript
//放弃"_",用undersoce作为对象的引用
console.log(_);     //ƒ (n) { return n instanceof m ? n : this instanceof m ? void (this._wrapped = n) : new m(n) }
var underscore = _.noConflict();
console.log(_); //undefined;
```
- `identity`,返回与传入参数相等的值. 相当于数学里的:f(x)=x,在Underscore里被用作默认的迭代器iterator.
```javascript
var stooge = {name: 'moe'};
stooge === _.identity(stooge);  //true
```
- `_.constant(value)`,创造一个函数，返回相同的值,这个值用来作为`_.constant`的参数
```javascript
var stooge = {name: 'moe'};
stooge === _.constant(stooge)();    //true
```
- `noop`,返回`undefined`，不论传递给它的是什么参数。可以用作默认可选的回调参数
```javascript
obj.initialize = _.noop;
```
- `_.times(n, iteratee, [context])`,调用给定的迭代函数n次,每一次调用`iteratee`传递`index`参数。生成一个返回值的数组
- `_.random(min,max)`,返回一个min 和 max之间的随机整数。如果只传递一个参数，那么将返回0和这个参数之间的整数
```javascript
_.random(0, 100);  //71
```
- `_.mixin(object)`,允许用自己的实用程序函数扩展Underscore。传递一个`{name: function}`定义的`hash`添加到Underscore对象，以及面向对象封装。
```javascript
_.mixin({
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});
_("fabio").capitalize();        //Fabio
```
- `_.iteratee(value, [context])`,一个重要的内部函数用来生成可应用到集合中每个元素的回调，返回想要的结果 - 无论是等式，任意回调，属性匹配，或属性访问。 
通过`_.iteratee`转换判断的`Underscore`方法的完整列表是`map`,`find`,`filter`,`reject`,`every`,`some`,`max`,`min`,`sortBy`,`groupBy`, `indexBy`,`countBy`,`sortedIndex`,`partition`,和`unique`    .
```javascript
var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
_.map(stooges, _.iteratee('age'));      //[25,21,23]
```
- `_.uniqueId([prefix])`,为需要的客户端模型或DOM元素生成一个全局唯一的id。如果`prefix`参数存在， id将附加给它
```javascript
_.uniqueId('contact_'); //contact_1
```
- `escape`,转义HTML字符串，替换`&`,`<`,`>`,`"`,`'`, 和`/`字符
```javascript
_.escape('Curly, Larry & Moe'); //"Curly, Larry &amp; Moe"
```
- `unescape`,和escape相反。转义HTML字符串，替换`&`,`&lt;`,`&gt;`,`&quot;`,`&#96;`,和`&#x2F;`字符
```javascript
_.unescape('Curly, Larry &amp; Moe'); //"Curly, Larry &amp; Moe"
```
- `_.result(object, property, [defaultValue])`,如果指定的`property`的值是一个函数，那么将在object上下文内调用它;否则，返回它。如果提供默认值，并且属性不存在，那么默认值将被返回。如果设置`defaultValue`是一个函数，它的结果将被返回。
```javascript
var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
_.result(object, 'cheese');     //"crumpets"
_.result(object, 'stuff');      //"nonsense"
_.result(object, 'meat', 'ham');        //"ham"
```
- `now`,一个优化的方式来获得一个当前时间的整数时间戳。可用于实现定时/动画功能
```javascript
_.now();        //1510547359011
```
- `template`

### 实用功能可以参考[网站](http://underscorejs.org/#utility)