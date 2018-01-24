/**
 * nodejs连接MySQL创建表
 */

let mysql = require('mysql');
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'pass',
	database: 'todoapp'
});

//connect to mysql server
connection.connect(function(err){
	if(err){
		return console.error('error' + err.message);
	}

	let createTodos = 	`create table if not exists todos(
						 	id int primary key auto_increment,
                          	title varchar(255) not null,
                          	completed tinyint(1) not null default 0
						)`;

	connection.query(createTodos,function(err, result, fields){
		if(err){		//err:如果语句执行期间发生错误，则存储详细错误
			console.log(err.message);
		}

		console.log(result);	//result:包含查询的结果

		console.log(fields);	//fields:包含结果字段信息(如果有)
	});

	connection.end(function(err){
		if(err){
			return console.log(err.message);
		}
	});
})

