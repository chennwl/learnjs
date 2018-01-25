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
// Pet.create({
//     id: 'g-' + now,
//     name: 'Gaffey',
//     gender: false,
//     birth: '2007-07-07',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function(p){
//     console.log('created.' + JSON.stringify(p));
// }).catch(function(err){
//     console.log('failed: ' + err);
// });

// /**
//  * 使用await
//  */
// (async() => {
//     var dog = await Pet.create({
//         id: 'd-' + now,
//         name: 'Odie',
//         gender: false,
//         birth: '2008-08-08',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created.' + JSON.stringify(dog));
// })();

/**
 * 查询数据 findAll()方法
 */
(async() => {
    var pets = await Pet.findAll({  //先查找出对应条件的数据记录
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
        await p.save();     //更新数据 save()方法
        if (p.version === 3) {
            await p.destroy();  //删除数据 destroy()方法
            console.log(`${p.name} was destroyed.`);
        }
    }
})();

