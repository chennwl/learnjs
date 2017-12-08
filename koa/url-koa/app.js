//导入koa，和koa 1.x不同，在koa2中，导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

//require('koa-router')返回的是函数
const router = require('koa-router')();

//bodyParser是将formData数据放在resquest.body当中
const bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于每个http请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//     await next();
// });

app.use(bodyParser());

/**
 * get请求
 */
//add url-router
// router.get('/:title/:name', async(ctx, next) => {
//     console.log(ctx.params);
//     var name = ctx.params.name;
//     var title = ctx.params.title;    
//     ctx.response.body = `<h1>${title}, ${name}!</h1>`;
// });

// router.get('/', async(ctx, next) => {
//     ctx.response.body = `<h1>Index</h1>`;
// });


/**
 * post请求
 */
router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin',async(ctx, next) => {
    var 
        name = ctx.request.body.name || '',
        pwd = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${pwd}`);
    if(name === 'koa' && pwd === '123456'){
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

//add router middleware
app.use(router.routes());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');