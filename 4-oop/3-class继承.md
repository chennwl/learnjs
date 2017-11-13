## class继承
- `class`是ES6的语法。`class`的目的是让定义类更简单
```javascript
//用class关键字来编写Student，constructor是构造函数
class Student{
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}
//创建Student对象
var xiaoming = new Student('小明');
xiaoming.hello();
```
- `class`继承可以直接通过`extends`来实现
```javascript
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        // alert('I am at grade ' + this.grade);
        alert(`I am at grade ${this.grade}`);
    }
}
//PrimaryStudent已经自动获得了父类Student的hello方法，又在子类中定义了新的myGrade方法
```
- 不是所有的浏览器都支持ES6的class，`Babel`能把`class`代码转换为传统的`prototype`代码