# 组件(component)
组件可以扩展HTML元素，封装可重用的代码。组件（Component）是前端在单页面应用（SPA）上最好的一种实现方式，把所有功能模块拆解成单独的组件，每个组件都有独立的作用域，且还可以相互通信

## 使用组件
- 全局组件
#### 注册一个全局组件，可以使用 Vue.component(tagName, options)

```javascript
Vue.component('my-component', {
  // 选项
});
```
- 局部组件
#### 通过某个 Vue 实例/组件的实例选项 components 注册仅在其作用域中可用的组件

```javascript
var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  el: '#app',
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
});
```
- DOM 模板解析注意事项
#### 当使用 DOM 作为模板时，会受到 HTML 本身的一些限制。使用来自以下来源之一的字符串模板，则没有这些限制
    - `<script type="text/x-template">`
    - JavaScript 内联模板字符串
    ```html
    <template v-if="ok">
        <h2>Title</h2>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </template>
    ```
    - `.vue` 组件
    ```javascript
    var p = new Vue({
        template: '<MyComponent></MyComponent>'
    });
    ```

－ 在组件里面data必须是函数并返回一个对象
#### 构造 Vue 实例时传入的各种选项大多数都可以在组件里使用。只有一个例外：data 必须是函数。

```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```
```javascript
Vue.component('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    data: function () {
        return {
            counter: 0
        }
    }
})

new Vue({
    el: '#example-2'
});
```

- 组件组合

    在 Vue 中，父子组件的关系可以总结为 prop 向下传递，事件向上传递。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息

## Prop(父组件使用 prop 传递数据给子组件)
- 使用Prop传递数据

    组件实例的作用域是孤立的。父组件的数据需要通过 prop 才能下发到子组件中。 
```html
<div id="prop-example-1">
    <!-- 父组件的数据 mess 通过prop才能下发到子组件 message 中 -->
    <child :message="mess"></child>
</div>
```
```javascript
var propExample1 = new Vue({
    el: '#prop-example-1',
    data: {
        mess: '父组件内容'
    },
    components: {
        child: {
            //声明 props
            props: ['message'],
            template: '<span>{{ message }}</span>'
        }
    }
});
```
- camelCase(驼峰式命名) vs. kebab-case(短横线分隔式命名)

    当使用不是字符串模板时，camelCase的prop需要转换相对应的 kebab-case：
```javascript
Vue.component('child', {
  // 在 JavaScript 中使用 camelCase
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
});
```
```html
<!-- 在 HTML 中使用 kebab-case -->
<child my-message="hello!"></child>
```

- 动态prop

    用 ｀v-bind｀ 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件：
    ```javascript
    new Vue({
      el: '#prop-example-2',
      data: {
        parentMsg: 'Message from parent'
      },
      components: {
        child: {
            props: ['myMessage'],
            template: '<span>{{ myMessage }}</span>'
        }
      }
    });
    ```
    ```html
    <div id="prop-example-2">
      <input v-model="parentMsg">
      <br>
      <child v-bind:my-message="parentMsg"></child>
    </div>
    ```

- 字面量语法 vs 动态语法

    使用字面量语法传递数值：
    ```html
    <!-- 传递的是一个字符串 "1" -->
    <comp some-prop="1"></comp> 
    ```
    使用动态语法传递数值：
    ```html
    <!-- 传递真正的数值 -->
    <comp v-bind:some-prop="1"></comp>
    ```

- 单向数据流

    子组件内部的prop中的数据不应该改变。如果忍不住想去修改 prop 中的数据，正确的应对方法是：
    1. 定义一个局部变量，并用 prop 的值初始化它：
    ```javascript
    props: ['initialCounter'],
    data: function () {
        return { counter: this.initialCounter }
    }
    ```
    2. 定义一个计算属性，处理 prop 的值并返回：
    ```javascript
    props: ['size'],
    computed: {
        normalizedSize: function () {
            return this.size.trim().toLowerCase()
        }
    }
    ```

- Prop验证

    为组件的prop指定验证规则。如果传入的数据不符合要求，Vue 会发出警告。
    ```javascript
    Vue.component('example', {
      props: {
        // 基础类型检测 (`null` 指允许任何类型)
        propA: Number,
        // 可能是多种类型
        propB: [String, Number],
        // 必传且是字符串
        propC: {
          type: String,
          required: true
        },
        // 数值且有默认值
        propD: {
          type: Number,
          default: 100
        },
        // 数组/对象的默认值应当由一个工厂函数返回
        propE: {
          type: Object,
          default: function () {
            return { message: 'hello' }
          }
        },
        // 自定义验证函数
        propF: {
          validator: function (value) {
            return value > 10
          }
        }
      }
    });
    ```
    - type可以是原生构造器：
        + String
        + Number
        + Boolean
        + Function
        + Object
        + Array
        + Symbol
    - type也可以是自定义构造器函数，使用 `instanceof` 检测
    - prop 会在组件实例创建之前进行校验，所以在 `default` 或 `validator` 函数里，诸如 `data`、`computed` 或 `methods` 等实例属性还无法使用

## 非Prop特性
- 指它可以直接传入组件，而不需要定义相应的 ｀prop｀
- 尽管为组件定义明确的 ｀prop｀ 是推荐的传参方式，组件的作者却并不总能预见到组件被使用的场景。所以，组件可以接收任意传入的特性，这些特性都会被添加到组件的根元素上。 

## 自定义事件(子组件跟父组件通信)
- 使用v-on绑定自定义事件

    每个 Vue 实例都实现了事件接口，即：
    - 使用 ｀$on(eventName)` 监听事件
    - 使用 ｀$emit(eventName, optionalPayload)` 触发事件


