# crypto
- `crypto`模块提供了加密功能，包含对OpenSSL的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

## MD5和SHA1
- MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：
```javascript
const crypto = require('crypto');
const hash = crypto.createHash('md5');      //md5,sha1,sha256,sha512

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // ab9a2dc03a8d417a2b9945bf0f58be84
```
- `update()`方法默认字符串编码为`utf-8`，也可以传入Buffer
- 如果要计算SHA1，只需要把`'md5'`改成`'sha1'`，还可以使用更安全的`sha256`和`sha512`

## Hmac
- Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：
```javascript
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex')); // 80f7e22570...
```
只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法

## AES
- AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用
- AES有`aes192`，`aes-128-ecb`，`aes-256-cbc`等很多不同的算法
- AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的
- 加密结果通常有两种表示方法：`hex`和`base64`
```javascript
const crypto = require('crypto');

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);  //aes192是AES算法
    var crypted = cipher.update(data, 'utf8', 'hex');   //hex是加密方法
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';  //密钥
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);     //Plain text: Hello, this is a secret message!
console.log('Encrypted text: ' + encrypted);        //8a944d97bdabc...
console.log('Decrypted text: ' + decrypted);        //Hello, this is a secret message!
```

## Diffie-Hellman
- DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来
- 用crypto模块实现DH算法如下：
```javascript
const crypto = require('crypto');

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex')); //Prime: 86e49ecc...
console.log('Generator: ' + generator.toString('hex')); //Generator: 02

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex')); //Secret of Xiao Ming: 2e394941027995f...9126
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex')); //Secret of Xiao Hong: 2e394941027995f...9126
```
每次输出都不一样，因为素数的选择是随机的。

## 证书
crypto模块也可以处理数字证书。数字证书通常用在SSL连接，也就是Web的https连接。一般情况下，https连接只需要处理服务器端的单向认证，如无特殊需求（例如自己作为Root给客户发认证证书），建议用反向代理服务器如Nginx等Web服务器去处理证书。


