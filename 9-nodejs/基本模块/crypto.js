const crypto = require('crypto');

/*MD5*/
// const hash = crypto.createHash('md5');

// //可任意多次调用update()
// hash.update("Hello world!");    //fc3ff98e8c6a0d3087d515c0473f8677
// hash.update('Hello, nodejs!');  //ab9a2dc03a8d417a2b9945bf0f58be84

// console.log(hash.digest('hex'));


/*Hmac*/
// const hmac = crypto.createHmac('sha256', 'secret-key');

// hmac.update('Hello, world!');
// hmac.update('Hello, nodejs!');

// console.log(hmac.digest('hex')); // 80f7e22570bed1fa3ef683edce5d0890e268e1ca8d1bd0c382bc766f3744be9f


/*AES*/
// function aesEncrypt(data, key) {
//     const cipher = crypto.createCipher('aes192', key);
//     var crypted = cipher.update(data, 'utf8', 'hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }

// function aesDecrypt(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

// var data = 'Hello, this is a secret message!';
// var key = 'Password!';  //密钥
// var encrypted = aesEncrypt(data, key);
// var decrypted = aesDecrypt(encrypted, key);

// console.log('Plain text: ' + data);
// //加密方法是base64：ipRNl72rwVelt6QMsYDnE/kB0utFQiDWqqGYSDHhcjH4d5nvM044JRI2WMgODl0M   -- 64位数 --
// //加密方法是hex：8a944d97bdabc157a5b7a40cb180e713f901d2eb454220d6aaa1984831e17231f87799ef334e3825123658c80e0e5d0c
// console.log('Encrypted text: ' + encrypted);        
// console.log('Decrypted text: ' + decrypted);

/* DH算法 */
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