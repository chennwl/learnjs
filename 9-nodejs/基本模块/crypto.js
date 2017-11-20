const crypto = require('crypto');
const hash = crypto.createHash('md5');

//可任意多次调用update()
hash.update("Hello world!");    //fc3ff98e8c6a0d3087d515c0473f8677
hash.update('Hello, nodejs!');  //ab9a2dc03a8d417a2b9945bf0f58be84

console.log(hash.digest('hex'));        