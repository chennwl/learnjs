# url 模块
请求的url都是字符串类型，url所包含的信息也比较多，比如有：协议、主机名、端口、路径、参数、锚点等，如果对字符串解析这些信息的话，会相对麻烦，因此，Node.js 的原生模块url模块便可轻松解决这一问题

## 字符串转对象
- 格式：`url.parse(urlstring, boolean)`
- 参数
    - `urlstring`：字符串格式的 url
    - `boolean`：在url中有参数，默认参数为字符串，如果此参数为`true`，则会自动将参数转转对象
- 常用属性
    - `href`： 解析前的完整原始 URL，协议名和主机名已转为小写
    - `protocol`： 请求协议，小写
    - `host`： url 主机名，包括端口信息，小写
    - `hostname`: 主机名，小写
    - `port`: 主机的端口号
    - `pathname`: URL中路径，下面例子的 /one
    - `search`: 查询对象，即：queryString，包括之前的问号“?”
    - `path`: `pathname` 和 `search`的合集
    - `query`: 查询字符串中的参数部分（问号后面部分字符串），或者使用 querystring.parse() 解析后返回的对象
    - `hash`: 锚点部分（即：“#”及其后的部分）

```javascript
var url = require('url');

//第二个参数为 true
var urlObj = url.parse('http://www.william-Chan.com:8080/one?a=index&t=article&m=default#william', true);
//urlObj.query 为一个对象 => {a: 'index', t: 'article', m: 'default'}
console.log(urlObj);

//第二个参数为 false
urlObj = url.parse('http://www.william-Chan.com/one:/8080?a=index&t=article&m=default#william', false);
//urlObj.query 为一个字符串 => ?a=index&t=article&m=default
console.log(urlObj);
```

## URL的序列化的字符串
- 格式：url.format(URL[,options])
    - 参数URL
    - options 数组
        - `auth <boolean>` 如果序列化的URL字符串应该包含用户名和密码为`true`，否则为`false`。默认为`true`。
        - `fragment <boolean>` 如果序列化的URL字符串应该包含分段为`true`，否则为`false`。默认为`true`。
        - `search <boolean>` 如果序列化的URL字符串应该包含搜索查询为`true`，否则为`false`。默认为`true`。
        - `unicode <boolean>` true 如果出现在URL字符串主机元素里的`Unicode`字符应该被直接编码而不是使用`Punycode`编码为`true`，默认为`false`。

```javascript
const { URL } = require('url');
const myURL = new URL('https://a:b@你好你好?abc#foo');

console.log(myURL.href); // 输出 https://a:b@xn--6qqa088eba/?abc#foo

console.log(myURL.toString());// 输出 https://a:b@xn--6qqa088eba/?abc#foo

console.log(url.format(myURL, { fragment: false, unicode: true, auth: false })); // 输出 'https://你好你好/?abc'
```

## url.resolve
当有多个 url 需要拼接处理的时候，可以用到 url.resolve
```javascript
var url = require('url');
url.resolve('http://william-Chan.com/', '/one')// 'http://william-Chan.com/one'
```