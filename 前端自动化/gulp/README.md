# gulp -- 基于流的自动化构建工具
## 安装
1. 作为项目的开发依赖（devDependencies）安装
```scss
$ npm install --save-dev gulp //会保存在package.json里面的devDependencies对象里面
/*注：
dependencies就是程序跑起来需要的模块，没有这个模块程序就会报错。
devDependencies开发依赖，开发程序的时候需要的模块了。
举个例子，用angularjs框架开发一个程序，开发阶段需要用到gulp来构建开发和本地运行环境。所以angularjs一定要放到dependencies里，因为以后程序到生产环境也要用。gulp则是用来压缩代码，打包等需要的工具，程序实际运行的时候并不需要，所以放到dev里就ok。
*/
```
2. 在项目根目录下创建一个名为 `gulpfile.js` 的文件
```javascript
var gulp = require('gulp'); //nodejs模式导入

gulp.task('default', function() {
  // 将默认的任务代码放在这
});
```
## gulp API
- `gulp.src(globs[,options])`，输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件
    - globs：所要读取的 `glob` 或者包含 `globs` 的数组。
    - options：通过 `glob-stream` 所传递给 `node-glob` 的参数。
```javascript
gulp.src('client/templates/*.jade')
  .pipe(jade()) //返回一个流可以被piped到别的插件中
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
```