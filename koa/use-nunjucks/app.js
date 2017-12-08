const nunjucks = require('nunjucks');

function createEnv(path,opts) {
    var 
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,        //控制输出是否转义
        noCache = opts.noCache || false,        //不使用缓存
        watch = opts.watch || false,    //当模板变化时重新加载
        throwOnUndefined = opts.throwOnUndefined || false,  //当输出为null或undefined会抛出异常
        env = new nunjucks.Environment(     //用来管理模板，可以用来加载模板
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
    },
}); 

// console.log(env);
var s = env.render('hello.html', { 
    name: '<nunjucks>',
    fruits: ['Apple','Pear','Banana'],
    count: 12000
});
console.log(s);

console.log(env.render('extend.html',{
    header: 'Hello',
    body: 'hahaha，我继承了'
}));