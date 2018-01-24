/**
 * nodejs连接到mysql数据库
 */

let mysql = require('mysql'); //导入mysql模块

/**
 * 通过调用createConnection()方法并提供MYSQL服务器上的详细信息，建立与MySQL数据库的连接
 */
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'pass',
	database: 'todoapp'
});

/**
 * 在连接对象上调用connect()方法连接到MySQL数据库服务器
 */
connection.connect(function(err, connection){
	if(err){
		return console.error('error' + err.message);
	}

	console.log('Connected to the MySQL server.');
	console.log(connection);
});

// connection.destroy();		//立即强制连接

/**
 * 关闭数据库连接，end()方法确保在数据库连接关闭之前始终执行所有剩余的查询
 */
connection.end(function(err){
	if(err){
		return console.log('error' + err.message);
	}

	console.log('Close the database connection.');
});