## Node.js连接MySQL
- 对于Node.js程序，访问MySQL是通过网络发送SQL命令给MySQL服务器
- MySQL Node.js驱动程序是开源的`mysql`，可以直接使用npm安装`(npm install mysql)`

## ORM(Object-Relational Mapping)，把关系数据库的表结构映射到对象上
- 选择Node的ORM框架Sequelize来操作数据库，这样读写的都是JavaScript对象，Sequelize可以把对象变成数据库中的行。
- Sequelize返回的对象是Promise，所以可以用`then()`和`catch()`分别异步响应成功和失败
```javascript
/**
 * 用Sequelize查询pets表 
*/
Pet.findAll()
   .then(function(pets){
       for(let pet in pets){
           console.log(`${pet.id}: ${pet.name}`);
       }
   }).catch(function(err){
       //error
   });
```
- 也可以用ES7的`await`来调用任何一个Promise对象，但`await`必须在async函数中调用
```javascript
(async () => {
    var pets = await Pet.findAll();
})();
```

## 示例
```javascript
/**
 * 使用koa的js
 */

 let Sequelize = require('sequelize');
 let config = require('./config.js');

 /**
  * 创建Sequelize对象示例
  */
 var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
 });

 /**
  * 定义模型Pet，告诉Sequelize如何映射数据库表
  */
var Pet = sequelize.define('pet', { //第二个参数指定列名和数据类型，主键需要详细地指定
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, { //第三个参数是额外的配置
    timestamps: false           //这里是为了关闭Sequelize的自动添加timestamp的功能
});

var now = Date.now();

/**
 * 用Promise的方式往数据库添加数据
 */
Pet.create({
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2007-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function(p){
    console.log('created.' + JSON.stringify(p));
}).catch(function(err){
    console.log('failed: ' + err);
});

/**
 * 使用await
 */
(async() => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created.' + JSON.stringify(dog));
})();

/**
 * 查询数据 findAll()方法
 */
(async() => {
    //先查找出对应条件的数据记录 findAll()
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for(let p of pets){
        console.log(JSON.stringify(p));
        console.log('update pet...');
        p.gender = true;
        p.updatedAt = Date.now();
        p.version++;
        //更新数据 save()方法
        await p.save();
        if (p.version === 3) {
            //删除数据 destroy()方法
            await p.destroy();
            console.log(`${p.name} was destroyed.`);
        }
    }
})();
```

## Model
- `sequelize.define()`返回的`Pet`称之为Model，它表示一个数据模型
- 通过`Pet.findAll()`从数据库返回的一个或一组对象称为Model实例，每个实例都可以直接通过`JSON.stringify`序列化为JSON字符串。但是它们和普通JSON对象相比，多了一些由Sequelize添加的方法，比如`save()`和`destroy()`。调用这些方法就可以执行更新或者删除操作
- `findAll()`方法可以接收`where`、`order`这些参数，这和将要生成的SQL语句是对应的。