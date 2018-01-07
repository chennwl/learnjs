'use strict';
//url.parse(urlstring,boolean)字符串转对象
var url = require("url");

var urlObj = url.parse("http://www.williamChann.com/one?a=index&t=article&m=default#wlc", true);
console.log(urlObj);

urlObj = url.parse("http://www.williamChann.com/one?a=index&t=article&m=default#cwl", false);
console.log(urlObj);

// var url = require('url');

// var urlObj = {
// 	protocol: 'http:',
// 	slashes: true,
// 	hostname: 'baidu.com',
// 	port: 80,
// 	hash: '#hash',
// 	pathname: '/nodejs',
// 	search: '?query=string',
// 	path: '/nodejs?query=string'
// }

// var result = url.format(urlObj);
// console.log(result);
// //http://baidu.com:80/nodejs?quert=string#hash


var a = url.resolve('http://william.com/', '/hahaha')
console.log(a);     // 'http://william.com/hahaha'