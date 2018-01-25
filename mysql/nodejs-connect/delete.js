/**
 * 连接MySQL并删除表数据
 */

let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

//delete statment
let sql = `DELETE FROM todos WHERE id = ?`;

//delete a row with id 1
connection.query(sql, 1, (error, results, fields) => {
	if(error){
		return console.error('error' + error.message);
	}

	console.log('Delete Row(s):' + results.affectedRows);
});

connection.end();
