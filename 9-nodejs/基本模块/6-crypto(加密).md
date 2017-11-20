# crypto
- `crypto`模块提供了加密功能，包含对OpenSSL的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

## MD5和SHA1
- MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：
    - `update()`方法默认字符串编码为`utf-8`，也可以传入Buffer
    - 如果要计算SHA1，只需要把`'md5'`改成`'sha1'`，还可以使用更安全的`sha256`和`sha512`
```javascript
const crypto = require('crypto');
const hash = crypto.createHash('md5');      //md5,sha1,sha256,sha512

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // ab9a2dc03a8d417a2b9945bf0f58be84
```
- 

