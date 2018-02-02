## 模块
- 使用`nvm`或`n`可以切换工作环境的node版本
- 创建模块与引用
    - 要在模块中对外输出变量，用：`module.exports = variable;`,输出的变量可以是任意对象、函数、数组等等。如`module.exports = greet`
    - 要引入其他模块输出的对象，用：`var foo = require('other_module');`,引入的对象具体是什么，取决于引入模块输出的对象。如`var greet = require('./hello'); // 不要忘了写相对位置目录!`,`.`表示当前目录
- `module.exports`与`exports`
    - 如果要输出一个键值对象`{}`，可以利用exports这个已存在的空对象`{}`，并继续在上面添加新的键值；
    - 如果要输出一个函数或数组，必须直接对`module.exports`对象赋值。直接对`module.exports`赋值，可以应对任何情况.
    - 使用`module.exports = xxx`的方式来输出模块变量就没问题了
    