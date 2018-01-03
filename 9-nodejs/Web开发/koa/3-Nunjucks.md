# Nunjucks
- 模块引擎，基于模板配合数据构造出字符串输出的一个组件
- 模板引擎能够做到转义、格式化、简单逻辑等功能，这是JavaScript的模板字符串做不到的

## 模板引擎
- 编写nunjucks的函数`render`
```javascript
const nunjucks = require('nunjucks');

function createEnv(path,opts) {
    var 
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,        //控制输出是否转义
        noCache = opts.noCache || false,        //不使用缓存
        watch = opts.watch || false,    //当模板变化时重新加载
        throwOnUndefined = opts.throwOnUndefined || false,  //当输出为null或undefined会抛出异常
        env = new nunjucks.Environment( //用来管理模板，可以用来加载模板
            new nunjucks.FileSystemLoader('views', {     //从文件系统中加载模板
                noCache: noCache,   //为true时，不使用缓存，模板每次都会重新编译
                watch: watch,       //为true时，当文件系统上的模板变化了，系统会自动更新他
            }),{
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }
        )
        if(opts.filters){
            for (var f in opts.filters) {
                env.addFilter(f, opts.filters[f]);
            }
        }
    return env;
}
//env为nunjucks模板引擎对象,有一个render(view, model)方法，正好传入view和model两个参数，并返回字符串
var env = createEnv('views',{       
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
}); 
var s = env.render('hello.html', { name: '小明'});
console.log(s);
```
- 使用Nunjucks提供的功能强大的tag，编写条件判断、循环等功能
```javascript
var s = env.render('hello.html', { 
    name: '<nunjucks>',
    fruits: ['Apple','Pear','Banana'],
    count: 12000
});
```
- 模板继承可以达到模板复用的效果，当写一个模板的时候可以定义 "blocks"，子模板可以覆盖他，同时支持多层继承。
```javascript
//base.html文件
<html><body>
{% block header %} <h3>Unnamed</h3> {% endblock %}
{% block body %} <div>No body</div> {% endblock %}
{% block footer %} <div>copyright</div> {% endblock %}
</body>
//继承extend.html文件
{% extend base.html %}
{% block header %}<h1>{{ header }}</h1>{% endblock %}
{% block body %}<h1>{{ body }}</h1>{% endblock %}

//js渲染代码
env.render('extend.html',{
    header: 'Hello',
    body: 'hahaha，我继承了'
});
```

## 性能
- 模板渲染本身来说就是拼字符串，纯CPU操作，速度是非常非常快的
- 性能问题主要出现在从文件读取模板内容这一步。这是一个IO操作，在Node.js环境中，单线程的JavaScript最不能忍受的就是同步IO，但Nunjucks默认就使用同步IO读取模板文件
- 但Nunjucks会缓存已读取的文件内容，也就是说，模板文件最多读取一次，就会放在内存中，后面的请求是不会再次读取文件的，所以只要指定了`noCache: false`这个参数就可以。
- 在开发环境下，可以关闭cache，这样每次重新加载模板，便于实时修改模板。在生产环境下，一定要打开cache，这样就不会有性能问题