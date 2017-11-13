## Functions
- `bind`/`bindAll`
    - `_.bind(function, object, *arguments)`,绑定函数`function`到对象`object`上，函数里的`this`指向`object`
    ```javascript
    var func = function(greeting){ return greeting + ': ' + this.name };
    func = _.bind(func, {name: 'moe'}, 'hi');
    func(); //'hi:moe'
    ```
    - `_.bindAll(object, *methodNames)`,把`methodNames`参数指定的一些方法绑定到`object`上，这些方法就会在对象的上下文环境中执行。
    ```javascript
    var buttonView = {
        label  : 'underscore',
        onClick: function(){ alert('clicked: ' + this.label); },
        onHover: function(){ console.log('hovering: ' + this.label); }
    };
    _.bindAll(buttonView, 'onClick', 'onHover');
    // When the button is clicked, this.label will have the correct value.
    jQuery('#underscore_button').bind('click', buttonView.onClick);
    ```
- `partial`就是为一个函数创建偏函数。创建偏函数的目的是将原函数的某些参数固定住，可以降低新函数调用的难度
```javascript
//固定第一个参数x为2
var pow2N = _.partial(Math.pow, 2);     //Math.pow(x,y)
pow2N(3); // 2的3次方为8
pow2N(5); // 32
pow2N(10); // 1024

//固定第二个参数为3，第一个不固定用_占位符
var cube = _.partial(Math.pow, _, 3);
cube(3); // 3的3次方为27
cube(5); // 5的3次方为125
cube(10); // 1000
```
- `memoize`在一个函数调用开销很大时，可以自动缓存函数计算的结果，在后续调用时直接获得结果
```javascript
//递归调用
var factorial = _.memoize(function(n) {
    console.log('start calculate ' + n + '!...');
    if (n < 2) {
        return 1;
    }
    return n * factorial(n - 1);
});

factorial(10); // 3628800
// 输出结果说明factorial(1)~factorial(10)都已经缓存了:
// start calculate 10!...
// start calculate 9!...
// start calculate 8!...
// start calculate 7!...
// start calculate 6!...
// start calculate 5!...
// start calculate 4!...
// start calculate 3!...
// start calculate 2!...
// start calculate 1!...

factorial(9); // 362880
// 直接返回上次计算后缓存的结果，console无输出
```
- `delay`/`defer`
    - `_.delay(function, wait, *arguments)`可以让一个函数延迟执行，效果和`setTimeout()`是一样的
    ```javascript
    var log = _.bind(console.log, console);
    _.delay(log, 2000, 'Hello,', 'world!');
    // 2秒后打印'Hello, world!'
    ```
    - `_defer(function,*arguments)`延迟调用function直到当前调用栈清空为止，类似使用延时为0的`setTimeout`方法
- `throttle`函数节流/`debounce`函数去抖
- `once`保证某个函数执行且仅执行一次
```javascript
var register = _.once(function () {
    console.log('Register ok!');
});
// 测试效果:
register();     //只会第一次调用
register();
```
- `after`/`before`/
    - `_.after(count, function)`,创建一个函数, 只有在运行了`count`次之后才有效果. 在处理同组异步请求返回结果时, 如果要确保同组里所有异步请求完成之后才执行这个函数, 这将非常有用
    ```javascript
    var renderNotes = _.after(notes.length, render);
    _.each(notes, function(note) {
        note.asyncSave({success: renderNotes});
    });
    // renderNotes is run once, after all notes have saved.
    ```
    - `_.before(count, function)`,创建一个函数,调用不超过`count`次。 当`count`已经达到时，最后一个函数调用的结果 是被记住并返回 
- `wrap`/`negate`/`compose`
    - `_.wrap(function, wrapper)`,将第一个函数`function`封装到函数`wrapper`里面, 并把函数`function`作为第一个参数传给`wrapper`。
    - `_.negate(predicate)`,返回一个新的`predicate`函数的否定版本。
    - `_.compose(*functions)`,返回函数集 functions 组合后的复合函数, 也就是一个函数执行完之后把返回的结果再作为参数赋给下一个函数来执行.

### Functions函数可以参考[网站](http://underscorejs.org/#functions)