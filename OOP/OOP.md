## 面向对象编程
- 类：类是对象的类型模板。例如，定义`Student`类来表示学生，类本身是一种类型，`Student`表示学生类型，但不表示任何具体的某个学生；
- 实例：实例是根据类创建的对象，例如，根据`Student`类可以创建出`xiaoming`、`xiaohong`、`xiaomin`等多个实例，每个实例表示一个具体的学生，他们全都属于`Student`类型；
- JavaScript通过原型(prototype)来实现面向对象编程。
- 在JavaScript的原型链中，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已

**在编写JavaScript代码时，不要直接用`obj.__proto__`去改变一个对象的原型，并且，低版本的IE也无法使用`__proto__`。`Object.create()`方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象什么属性都没有，因此，可以编写一个函数来创建`xiaoming`**
```javascript
// 原型对象:
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    console.log(s);     //{}空对象
    // 初始化新对象:
    s.name = name;
    return s;
}

var xiaoming = createStudent('小明');
xiaoming.run(); // 小明 is running...
xiaoming.__proto__ === Student; // true
```