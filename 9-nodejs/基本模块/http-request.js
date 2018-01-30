var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	'content' : '测试测试',
	'mid' : 8837
});

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'zh-CN,zh;q=0.9',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'imooc_uuid=d08d9722-bf57-4e86-97bb-baf340b0dd6a; imooc_isnew_ct=1513351411; loginstate=1; apsid=FkNjU4MDZmNjU2ZDU4MDBiZDFlNjI1YzAyYzk4M2UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDMwODcyNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4NDExMzE3ODBAcXEuY29tAAAAAAAAAAAAAAAAAAAAADgxNDBjNDg3MDVmNTc3ZWU4ZGQ2M2YyNmY1MmRkMTc5DekzWg3pM1o%3DOG; imooc_isnew=2; IMCDNS=0; PHPSESSID=b0lgpl435nmc6h906aa87tp5h6; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1513516597,1513687241,1515072257,1515163224; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1515338977; cvde=5a4f8d6b923af-207',
		'Host': 'www.imooc.com',
		'Origin': 'https://www.imooc.com',
		'Referer': 'https://www.imooc.com/video/8837',
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest'
	}
}

var req = http.request(options, function(res){

	console.log('Status: ' + res.statusCode);	//正常是200
	console.log('headers: ' + JSON.stringify(res.headers));	//响应头

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));	//true Buffer:二进制数据
		console.log(typeof chunk);	//object
	});

	res.on('end', function(){
		console.log('评论完毕！');
	});
});

req.on('error', function(e){
	console.log('Error: ' + e.message);
});

req.write(postData);	//request.body请求体
req.end();