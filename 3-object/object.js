//RegExp
var str = "Hello world!";
var patt = /Hello/g;
var result = patt.exec(str);
console.log(result);

//全局搜索
var $str = "Visit W3School, W3School is a place to study web technology.";
var patt = new RegExp("W3School", "g");
var $result;

while (($result = patt.exec($str)) != null) {
    console.log($result);
    console.log(patt.lastIndex); //匹配到的字符串的下一个位置
}
console.log(patt.lastIndex);