/**
 * 连接MySQL并查询表数据
 */

let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);


/**
 * 普通查询
 */
// let sql = `select * from todos`;

// connection.query(sql, (err, results, fields) => {
// 	if(err){
// 		return console.error('error' + err.message);
// 	}

// 	console.log(results);
// });

/**
 * 将数据传递给查询
 */

// let sql = `SELECT * FROM todos WHERE completed=?`;		//使用问号(?)作为completed字段的占位符值

// connection.query(sql, [true], (err, results, fields) => {
// 	if(err){
// 		return console.error(err.message);
// 	}
// 	console.log(results);
// });


/**
 * 防止sql注入
 */
let id = process.argv[2]; //根据命令行中的参数的id来查询一个todo
// console.log(process);

//可疑用户可能通过传递参数中的SQL代码来利用该程序
//防止SQL注入，需要使用占位符(?)，或者使用mysql或连接对象的excape()方法
let sql = `SELECT * FROM todos WHERE id=` + mysql.escape(id);

connection.query(sql, (error, results, fields) => {
	if(error){
		return console.error(error.message);
	}
	console.log(results);
});

connection.end();