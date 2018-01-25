/**
 * 调用存储过程
 */

let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

let sql = `CALL filterTodo(?)`;		//使用占位符(?)将数据传递给存储过程

//将done参数的值作为query()方法的第二个参数传递
connection.query(sql, true, (error, results, fields) => {
	if(error){
		return console.error(error.message);
	}

	console.log(results[0]);
});

connection.end();