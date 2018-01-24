/**
 * 连接MySQL插入表数据
 */

let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);

// //插入一行
// let sql = 	`INSERT INTO todos(title,completed)
// 			 VALUES('Learn how to insert a new row',true)`;

// //execute the insert statment	query()方法执行插入语句
// connection.query(sql);


/**
 * 插入一行并返回插入的ID
 */
// let stmt = `INSERT INTO todos(title,completed)
// 			VALUES(?,?)`;		//?号作为占位符
// let todo = ['Insert a new row with placeholders',false];

// connection.query(stmt, todo, (err, results, fields) => {
// 	if(err){
// 		return console.error('error' + err.message);
// 	}
// 	//get inserted id
// 	console.log('Todo Id:' + results.insertId);
// });


/**
 * 一次插入多行
 */
let stmt = `INSERT INTO todos(title,completed)  VALUES ?`;	//只使用一个问号，因为多行数据是数组
let todos = [
	['Insert multiple rows at a time', false],
	['现在学习一次插入多行记录', true],
	['It should work perfectly', true]
];

connection.query(stmt, [todos], (err, results, fields) => {
	if(err){
		return console.error('error' + err.message);
	}
	//get inserted rows
	console.log('Row inserted:' + results.affectedRows);
});

connection.end();


