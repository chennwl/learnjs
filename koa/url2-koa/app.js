const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
//导入controller middleware
const controller = require('./controllers');       

const app = new Koa();
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());

//add router middleware
app.use(controller());  //controller是一个函数，返回的是router.routes()

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');