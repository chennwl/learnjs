# 混入
## 基础
混入(mixins)是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
```javascript
// 定义一个混入对象
var myMixin = {
  //创建的时候执行
    created: function () {
      this.hello();
    },
    methods: {
      hello: function () {
          console.log('hello from mixin!')  //第二执行
      }
    },
    data: function(){ //data要是函数
    return {
      name: 'hello world'
    }
  }
}

var test = {
  //创建的时候执行
  created: function(){
    console.log(this.name);   // =>hello world先执行，是因为 name 值改变了
  },
  data: function(){ //data要是函数
    return {
      name: 'hello vue'
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
    mixins: [test, myMixin] //后面同样的数据值会合并前面的
})

var component = new Component();  //data会合并，同名钩子函数会合并，是按顺序执行
console.log(component.name); // =>hello world
```

## 选项合并
当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合(`Vue.extend()`使用同样的策略合并)

- 数据对象data会在内部进行浅合并（一层属性深度），在和组件的数据发生冲突时以组件数据优先
```javascript
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
});
```
- 同名钩子函数将混入为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身的钩子之前调用
```javascript
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```
- 值为对象的选项，例如 `methods`, `components`和 `directives`，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对
```javascript
var mixin = {
  methods: {
    foo: function () {
      console.log('foo');
    },
    conflicting: function () {
      console.log('from mixin');
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar');
    },
    conflicting: function () {
      console.log('from self');
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```
- 全局混入
即全局注册混入对象，当使用全局混入对象时，将会影响到所有之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑
```javascript
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```
- 自定义选项合并策略
    - 自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 `Vue.config.optionMergeStrategies` 添加一个函数：
    ```javascript
    Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
      // return mergedVal
    }
    ```
    - 对于大多数对象选项，可以使用 `methods` 的合并策略
    ```javascript
    var strategies = Vue.config.optionMergeStrategies
    strategies.myOption = strategies.methods
    ```


