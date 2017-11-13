## JSON
- 序列化
    - JSON.stringify(obj,null, ' ');    //第二、第三个参数可以忽略不填
    - 第二个参数用于控制如何筛选对象的键值，如果我们只想输出指定的属性，可以传入`Array`
    - 还可以传入一个函数，这样对象的每个键值对都会被函数先处理
    ```javascript
    function convert(key, value) {
        if (typeof value === 'string') {
            return value.toUpperCase();
        }
        return value;
    }
    JSON.stringify(xiaoming, convert, '  ');
    //结果--所有属性值都变成大写了
    {
        "name": "小明",
        "age": 14,
        "gender": true,
        "height": 1.65,
        "grade": null,
        "middle-school": "\"W3C\" MIDDLE SCHOOL",
        "skills": [
            "JAVASCRIPT",
            "JAVA",
            "PYTHON",
            "LISP"
        ]
    }
    ```
    - 还想要精确控制如何序列化小明，可以给xiaoming定义一个`toJSON()`的方法，直接返回JSON应该序列化的数据
    ```javascript
    var xiaoming = {
        name: '小明',
        age: 14,
        gender: true,
        height: 1.65,
        grade: null,
        'middle-school': '\"W3C\" Middle School',
        skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
        toJSON: function () {
            return { // 只输出name和age，并且改变了key：
                'Name': this.name,
                'Age': this.age
            };
        }
    };

    JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
    ```
- 反序列化
    - JSON.parse();变成一个js对象
    ```javascript
    JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
    JSON.parse('{"name":"小明","age":14}'); // Object {name: '小明', age: 14}
    ```
    - `JSON.parse()`还可以接收一个函数，用来转换解析出的属性
    ```javascript
    JSON.parse('{"name":"小明","age":14}', function (key, value) {
        if (key === 'name') {
            return value + '同学';
        }
        return value;
    }); // Object {name: '小明同学', age: 14}
    ```