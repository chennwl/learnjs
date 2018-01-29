/**
 * path模块
 */
var path = require('path');
console.log(process.env.PATH.split(path.delimiter));  //process是全局变量，不用导入
console.log(path.delimiter);
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));