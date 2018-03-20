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
3. 运行gulp：`gulp`
## gulp API
1. `gulp.src(globs[,options])`，输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件
    ```javascript
    gulp.src('client/templates/*.jade')
      .pipe(jade()) 
      .pipe(minify())
      .pipe(gulp.dest('build/minified_templates'));//返回一个流可以被piped到别的插件中
    ```
    - globs：所要读取的 `glob` 或者包含 `globs` 的数组。(`String`和`Array`)
    - options：通过 `glob-stream` 所传递给 `node-glob` 的参数。(`Object`)
        - options.buffer(`Boolean`)
        - options.read(`Boolean`)
        - options.base(`String`)：将会加在`glob`之前
        ```javascript
        /* 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`*/
        gulp.src('client/js/**/*.js') 
        .pipe(minify())
        .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

        /*`base`解析为`client`*/
        gulp.src('client/js/**/*.js', { base: 'client' })
          .pipe(minify())
          .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
        ```

2. `gulp.dest(path[, options])`，能被 `pipe` 进来，并且将会写文件。并且重新输出所有数据，因此可以将它 `pipe` 到多个文件夹。如果某文件夹不存在，将会自动创建它
    ```javascript
    gulp.src('./client/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/templates'))
    .pipe(minify())
    .pipe(gulp.dest('./build/minified_templates'));
    ```
    - `path`：文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径，这个函数也可以由 `vinyl 文件实例` 来提供(`String` or `Function`)
    - `options`
        - `options.cwd`：输出目录的 `cwd` 参数，只在所给的输出目录是相对路径时候有效(`String`)
        - `options.mode`：八进制权限字符，用以定义所有在输出目录中所创建的目录的权限 

3. `gulp.task(name[,deps],fn)`，定义一个使用`Orchestrator`实现的任务。gulp会默认一次性运行所有的task并且不做等待。
    ```javascript
    gulp.task('somename', function() {
      // 做一些事
    });
    ```
    - `name`：任务的名字
    - `deps`：一个包含任务列表的数组，这些任务会在当前任务运行之前完成
    - `fn`：定义任务所要执行的一些操作。形式：`gulp.src().pipe(someplugin())`。任务可以异步执行，如果`fn`可以能做到一下其中一点：
        - 接受一个 callback
        ```javascript
        /* 在 shell 中执行一个命令 */
        var exec = require('child_process').exec;
        gulp.task('jekyll', function(cb) {
          /* 编译 Jekyll */
          exec('jekyll build', function(err) {
            if (err) return cb(err); /* 返回 error */
            cb(); /* 完成 task */
          });
        });
        ```
        - 返回一个 stream
        ```javascript
        gulp.task('somename', function() {
          var stream = gulp.src('client/**/*.js')
            .pipe(minify())
            .pipe(gulp.dest('build'));
          return stream;
        });
        ```
        - 返回一个 promise
        ```javascript
        var Q = require('q');
        gulp.task('somename', function() {
          var deferred = Q.defer();
          /* 执行异步的操作 */
          setTimeout(function() {
            deferred.resolve();
          }, 1);

          return deferred.promise;
        });
        ```

4. `gulp.watch(glob [, opts], tasks)` 或 `gulp.watch(glob [, opts, cb])`，监视文件，并且可以在文件发生改动时候做一些事情。它总会返回一个 `EventEmitter` 来发射 `change` 事件。
    - `gulp.watch(glob [, opts], tasks)`
        - `glob`：一个 `glob` 字符串，或者一个包含多个 `glob` 字符串的数组，用来指定具体监控哪些文件的变动。(`String`和`Array`)
        - `opts`：传给 `gaze` 的参数(`Object`)
        - `tasks`：需要在文件变动后执行的一个或者多个通过 `gulp.task()` 创建的 `task` 的名字
        ```javascript
        var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);  /*uglify,reload为gulp.task()创建的任务名称*/
        watcher.on('change', function(event) {
          console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
        ```
    - `gulp.watch(glob[, opts, cb])`
        - `glob`：一个 `glob` 字符串，或者一个包含多个 `glob` 字符串的数组，用来指定具体监控哪些文件的变动。(`String`和`Array`)
        - `opts`：传给 `gaze` 的参数(`Object`)
        - `cb(event)`：每次变动需要执行的 callback(`Function`)
            ```javascript
            gulp.watch('js/**/*.js', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
            ```
            - `event.type`：发生的变动的类型：`added`, `changed` 或者 `deleted`(`String`)
            - `event.path`：触发了该事件的文件的路径(`String`)
## gulp命令行(CLI)
1. 参数标记
    - `-v` 或 `--version` 会显示全局和项目本地所安装的 `gulp` 版本号
    - `--require <module path>` 将会在执行之前 `reqiure`一个模块。这对于一些语言编译器或者需要其他应用的情况来说来说很有用。可以使用多个`--require`
    - `--gulpfile <gulpfile path>` 手动指定一个 gulpfile 的路径，这在有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
    - `--cwd <dir path>` 手动指定 CWD。定义 gulpfile 查找的位置，此外，所有的相应的依赖（require）会从这里开始计算相对路径
    - `-T` 或 `--tasks` 会显示所指定 gulpfile 的 task 依赖树
    - `--tasks-simple` 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
    - `--color` 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
    - `--no-color` 强制不显示颜色，即便检测到有颜色支持
    - `--silent` 禁止所有的 gulp 日志
2. Tasks
    - Task 可以通过 `gulp <task> <othertask>` 方式来执行。如果只运行 `gulp` 命令，则会执行所注册的名为 `default` 的 task，如果没有这个 task，那么 gulp 会报错。
3. 编译器
    - 可以在[interpret](https://github.com/js-cli/js-interpret#jsvariants)找到所支持的语言列表
## gulp技巧集
[技巧集](https://www.gulpjs.com.cn/docs/recipes/)

## gulp 插件
- 在[主站](https://gulpjs.com/plugins/)上可以查看完整的列表。
```javascript
/*部分插件*/
var jshint = require('gulp-jshint');	//用于检测js是否有错误
var sass = require('gulp-sass');	    //sass
var concat = require('gulp-concat');	//合并文件
var uglify = require('gulp-uglify');	//压缩
var rename = require('gulp-rename');	//重命名
var imagemin = require('gulp-imagemin');	//压缩图片
var cleanCSS = require('gulp-clean-css');	//压缩css
var connect = require('gulp-connect');	//gulp http 服务器插件
```


