'use strict';
//url.parse(urlstring,boolean)字符串转对象
var url = require("url");

var urlObj = url.parse("http://www.williamChann.com/one?a=index&t=article&m=default#wlc", true);
console.log(urlObj);

urlObj = url.parse("http://www.williamChann.com/one?a=index&t=article&m=default#cwl", false);
console.log(urlObj);

//url.format(url)
// const { URL } = require('url');
// const myURL = new URL('https://a:b@你好你好?abc#foo');
// var urlString = url.format(myURL, { fragment: false, unicode: true, auth: false });
// console.log(urlString);

var a = url.resolve('http://dk-lan.com/', '/hahaha')
console.log(a);     // 'http://dk-lan.com/one'