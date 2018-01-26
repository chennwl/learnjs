/**
 * 池连接/连接池
 * 创建数据库连接是一个很耗时的操作，也容易对数据库造成安全隐患。所以，在程序初始化的时候，集中创建多个数据库连接，并把他们集中管理，供程序使用，可以保证较快的数据库读写速度，还更加安全可靠。
 * 数据库连接池负责分配,管理和释放数据库连接,它允许应用程序重复使用一个现有的数据库连接,而不是重新建立一个
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

