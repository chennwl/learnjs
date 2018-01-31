/**
 * Buffer(缓冲区)
 */


const buf = Buffer.from('runoob', 'ascii');
console.log(buf);
console.log(buf.toString('utf8'));
console.log(buf.toString('latin1'));
console.log(buf.toString('binary'));
console.log(buf.toString('hex'));   //72756e6f6f62
console.log(buf.toString('base64'));    //cnVub29i

/**
 * 创建Buffer类
 */
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

/**
 * 写入缓冲区
 */

buf7 = Buffer.alloc(256);
len = buf7.write("www.runoob.com");

console.log("写入字节数 : " + len);  //写入字节数 : 14

/**
 * 从缓冲区读取数据
 */
buf8 = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
    buf8[i] = i + 97;
}

console.log(buf8.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf8.toString('ascii', 0, 5));   // 输出: abcde
console.log(buf8.toString('utf8', 0, 5));    // 输出: abcde
console.log(buf8.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcde

/**
 * 缓冲区合并
 */
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3 内容: " + buffer3.toString());   //buffer3 内容: 菜鸟教程www.runoob.com

/**
 * 拷贝缓冲区
 */
var buf9 = Buffer.from('abcdefghijkl');
var buf10 = Buffer.from('RUNOOB');
//将 buf2 插入到 buf1 指定位置上
buf10.copy(buf9, 2);    // 从位置2开始插入
console.log(buf9.toString());   //abRUNOOBijkl