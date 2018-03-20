//nodejs模式引入gulp
var gulp = require('gulp');
//引入组件
var jshint = require('gulp-jshint');	//用于检测js是否有错误
var sass = require('gulp-sass-china');	//sass-china
var concat = require('gulp-concat');	//合并文件
var uglify = require('gulp-uglify');	//压缩
var rename = require('gulp-rename');	//重命名
var imagemin = require('gulp-imagemin');	//压缩图片
var cleanCSS = require('gulp-clean-css');	//压缩css
//var connect = require('gulp-connect');	//gulp http 服务器插件


//合并，压缩文件,script是任务名称
gulp.task('script',function(){
	gulp.src('libs/js/*.js')	//目标该目录下所有 js 文件
		.pipe(concat('all.js'))		//需要合并的文件
		.pipe(gulp.dest('libs/dist'))	//合并成功后的文件存放目录
		.pipe(rename('all.min.js'))	//合并成功后的文件改名
		.pipe(uglify())	//压缩
		.pipe(gulp.dest('libs/dist'));	//把压缩好的文件存放到该目录
});

//检查脚本
//在编译之前检查 js 脚本是否全部正确
gulp.task('lint',function(){
	gulp.src('libs/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

//压缩gif，png和jpg
gulp.task('img',function(){
	gulp.src('libs/images/*.{png,jpg,gif,ico}')
		.pipe(imagemin())
		.pipe(gulp.dest('libs/js'));
});

//压缩css
gulp.task('minicss',function(){
	return gulp.src('libs/css/*.css')	//需要操作的文件
		.pipe(rename({ suffix: '.min'}))	//rename压缩后的文件名
		.pipe(cleanCSS({ compatibility: 'ie7' }))	//执行压缩
		.pipe(gulp.dest('libs/dist'));	//输出文件夹
});

//压缩js
gulp.task('minijs',function(){
	/**返回的是一个流stream */
	return gulp.src('libs/js/*.js')		//需要操作的文件
		.pipe(concat('main.js'))	//合并所有js到main.js
		.pipe(gulp.dest('libs/dist'))		//输出到文件夹
		.pipe(rename({ suffix:'.min'}))		//rename压缩后的文件名
		.pipe(uglify())		//压缩
		.pipe(gulp.dest('libs/dist'));	//输出
});

gulp.task('watch',function(){
	gulp.watch(['libs/js/*.js'], ['minijs']);
	gulp.watch(['libs/css/*.css'], ['minicss']);
});

//默认任务
//gulp default
gulp.task('default',function(){
	gulp.run('watch');
});

//sass
gulp.task('sass',function(){
	gulp.src('libs/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('libs/css'));
});
