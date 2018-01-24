/**
 * 池连接/连接池
 */

let mysql = require('mysql');

//创建一个具有5个连接的连接池
var pool = mysql.createPool({
	connectionLimit: 5,
	host: 'localhost',
	user: 'root',
	password: 'pass',
	database: 'todoapp'
});

console.log(pool);

//从池中获取连接，使用getConnection()方法
pool.getConnection(function(err, connection){
	//execute query
	//...
	console.log(connection); //undefined ???

	connection.release();	//完成连接后将其连接到池。之后，连接将在池中可用，并可以由其他人再次使用
});

/**
 * 关闭连接并将其从池中删除，使用connection.destroy()方法。如果下次需要，将在池中创建一个新的连接。
 */


// 关闭池中的所有连接
pool.end(function(err){
	if(err){
		return console.log(err.message);
	}
});

