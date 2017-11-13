## Date
- `Date`对象表示日期和时间
```javacript
var now = new Date();   //这是从本机操作系统获取的时间
now; // Wed Sep 27 2017 18:07:53 GMT+0800 (CST)
now.getFullYear(); // 2017, 年份
now.getMonth(); // 8, 月份，注意月份范围是0~11，8表示九月
now.getDate(); // 27, 表示27号
now.getDay(); // 3, 表示星期三
now.getHours(); // 18, 24小时制
now.getMinutes(); // 07, 分钟
now.getSeconds(); // 53, 秒
now.getMilliseconds(); // 875, 毫秒数
now.getTime(); // 1506506969211, 以number形式表示的时间戳
```
- 创建一个指定日期和时间的`Date`对象
    - js的月份范围用整数表示是0~11
    ```javascript
    var d = new Date(2017, 8, 19, 20, 15, 30, 123);
    d; // Fri Sep 19 2017 20:15:30 GMT+0800 (CST)
    ```
    - 解析一个符合ISO 8601格式的字符串
    ```javascript
    var d = Date.parse('2015-06-24T19:49:22.875+08:00');
    d; // 1435146562875
    ```
    返回的是时间戳，时间戳转换成`Date`
    ```javascript
    var d = new Date(1435146562875);
    d; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
    ```
- 时区
    - `Date`对象表示的时间总是按浏览器所在时区显示的，但也可以显示调整后的UTC时间
    ```javascript
    var d = new Date(1435146562875);
    d.toLocaleString(); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
    d.toUTCString(); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时    
    ```
    - 时间戳是一个自增的整数，它表示从1970年1月1日零时整的GMT时区开始的那一刻，到现在的毫秒数。时间戳可以精确地表示一个时刻，并且与时区无关。
    ```javascript
    //获取时间戳的方法
    if (Date.now) {
        alert(Date.now()); // 老版本IE没有now()方法
    } else {
        alert(new Date().getTime());
    }
    ```
