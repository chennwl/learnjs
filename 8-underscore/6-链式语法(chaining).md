## 链式语法(Chaining)
- `_.chain(obj)`,返回一个封装的对象. 在封装的对象上调用方法会返回封装的对象本身, 直道 value 方法调用为止.
- `_(obj).value()`,获取封装对象的最终值.
```javascript
//计算一首歌的歌词里每一个单词出现的次数.
var lyrics = [
  {line: 1, words: "I'm a lumberjack and I'm okay"},
  {line: 2, words: "I sleep all night and I work all day"},
  {line: 3, words: "He's a lumberjack and he's okay"},
  {line: 4, words: "He sleeps all night and he works all day"}
];

_.chain(lyrics)
  .map(function(line) { return line.words.split(' '); })        //对lyrics这个数组里面的每一项作处理，返回一个多重数组
  .flatten()                //将多种嵌套的数组转换为只有一层的数组
  .reduce(function(counts, word) {      //word就是单词
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {})            //counts的初始值是对象{}
  .value(); //{I'm: 2, a: 2, lumberjack: 2, and: 4, okay: 2, …}
```

### 链式语法可以参考[网站](http://underscorejs.org/#chaining)