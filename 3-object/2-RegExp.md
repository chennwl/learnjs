## 正则表达式RegExp
- 基本匹配
    - `\d`匹配一个数字，`\w`匹配一个字母或者数字，`.`匹配任意字符
    - `*`表示任意个字符（包括0个），`+`表示一个字符，`?`表示0个或者1个字符，`{n}`表示n个字符，`{n,m}`表示n-m个字符
    - `\s`可以匹配一个空格（也包括Tab等空白符），特殊字符要用`\`转义，如`\-`
- 进阶：可以用`[]`表示范围
    - `[0-9a-zA-Z\_]`可以匹配一个数字、字母或者下划线；
    - `[0-9a-zA-Z\_]+`可以匹配至少由一个数字、字母或者下划线组成的字符串，比如'a100'，'0_Z'，'js2015'等等；
    - `[a-zA-Z\_\$][0-9a-zA-Z\_\$]*`可以匹配由字母或下划线、$开头，后接任意个由一个数字、字母或者下划线、$组成的字符串，也就是JavaScript允许的变量名；
    - `[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}`更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）
    - `A|B`可以匹配A或B
    - `^`表示行的开头，`^\d`表示必须以数字开头。
    - `$`表示行的结束，`\d$`表示必须以数字结束。
- RegExp
    - 直接通过`/正则表达式/`写出来
    - 通过`new RegExp('正则表达式')`创建一个RegExp对象
    - RegExp对象的`test()`方法用于测试给定的字符串是否符合条件
    ```javascript
    var re = /^\d{3}\-\d{3,8}$/;
    re.test('010-12345'); // true
    re.test('010-1234x'); // false
    re.test('010 12345'); // false
    ```
- 切分字符串：用正则表达式切分字符串比固定的字符更灵活
```javascript
'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']
```
- 分组
    - `String.exec()`方法用于检索字符串中的正则表达式的匹配，返回一个数组，存放匹配的结果。如果未找到匹配，则返回值为null
        - `index`属性声明的是匹配文本的第一个字符的位置。`input`属性则存放的是被检索的字符串`string`。在调用非全局的RegExp对象的`exec()`方法时，跟`String.match()`的结果是一样的。
        ```javascript
        var str = "Hello world!";
        var patt = /Hello/g;
        result = patt.exec(str);        //[ 'Hello', index: 0, input: 'Hello world!' ]
        ```
        - 当RegExpObject是全局正则表达式时，`exec()`会在RegExpObject的`lastIndex`属性指定的字符处开始检索字符串`string`。当`exec()`找到了与表达式相匹配的文本时，在匹配后，它将把RegExpObject的`lastIndex`属性设置为匹配文本的最后一个字符的下一个位置。当`exec()`再也找不到匹配的文本时，它将返回`null`，并把`lastIndex`属性重置为 0。
        ```javascript
        var $str = "Visit W3School, W3School is a place to study web technology.";
        var patt = new RegExp("W3School", "g");
        var $result;
        while (($result = patt.exec($str)) != null) {
            console.log($result);
            console.log(patt.lastIndex);
        }
        console.log(patt.lastIndex);    //0，找不到重置为0
        //输出结果
        [ 'W3School',index: 6,input: 'Visit W3School, W3School is a place to study web technology.' ]
        14      //lastIndex跳到下一个位置
        [ 'W3School',index: 16,input: 'Visit W3School, W3School is a place to study web technology.' ]
        24
        ```
    -  正则表达式有提取子串的强大功能，用`()`表示就是要提取的分组
    ```javascript
    var re = /^(\d{3})-(\d{3,8})$/;     //分别定义两个组
    re.exec('010-12345'); // ['010-12345', '010', '12345'] 返回整个字符串和匹配成功的子串
    re.exec('010 12345'); // null 匹配失败返回null
    ```
- 贪婪匹配：正则表达式默认是匹配尽可能多的字符
```javascript
var re = /^(\d+)(0*)$/;
re.exec('102300'); // ['102300', '102300', ''] 贪婪匹配，所以0*只能匹配空字符串

var re = /^(\d+?)(0*)$/;
re.exec('102300'); // ['102300', '1023', '00']  加了个?号非贪婪匹配
```
- 全局搜索
    - `g`表示全局匹配
    -  全局匹配可以多次执行`exec()`方法来搜索一个匹配的字符串。具体可参考上面
    - 全局匹配类似搜索，因此不能使用`/^...$/`，那样只会最多匹配一次。
    - 正则表达式还可以指定`i`标志，表示忽略大小写，`m`标志，表示执行多行匹配。


