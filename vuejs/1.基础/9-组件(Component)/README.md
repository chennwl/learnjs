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
  - 特殊的 HTML 结构中使用 is
  
    比如在下拉列表（select）元素里面，子元素必须为 option，则在使用组件的时候用 is
  ```html
      <div id="app">
          <select>
              <option is="privateOption"></option>
          </select>
      </div>
  ```
  ```javascript
      var vm = new Vue({
          el: '#app',
          components: {
              'privateOption': {
                  template: '<option value=1>1</otpion>'
              }
          }
      });
  ```
  渲染结果
  ```html
      <div id="app">
          <select>
              <option value="1">1</option>
          </select>
      </div>
  ```
  - 当使用 DOM 作为模板时，会受到类似上述的 HTML 本身的一些限制。使用来自以下来源之一的字符串模板，则没有这些限制
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

- 在组件里面data必须是函数并返回一个对象

  构造 Vue 实例时传入的各种选项大多数都可以在组件里使用。只有一个例外：data 必须是函数。

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

    用 `v-bind` 和 `v-model` 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件：
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
    ```html
    <div id="prop-example-3">
      <!-- 不加v-bind是字面量语法name字符串 -->
      <example prop-C="name"></example>
    </div>
    ```
    ```javascript
    new Vue({
      el: '#prop-example-3',
      components: {
        'example': {
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
          },
          template: '<div>{{propC + propD}}</div>' //渲染成name100
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

    - 每个 Vue 实例都实现了事件接口，即：
      - 使用 `$on(eventName)` 监听事件
      - 使用 `$emit(eventName, optionalPayload)` 触发事件
    - 父组件可以在使用子组件的地方直接用 `v-on` 来监听子组件触发的事件
      - 不能用 `$on` 监听子组件释放的事件，而必须在模板里直接用 `v-on` 绑定

    ```html
    <div id="counter-event-example">
      <p>{{ total }}</p>
      <!-- 在模板里直接用 v-on 绑定子组件释放的事件 -->
      <!-- increment是事件名称，incrementTotal是事件处理函数 -->
      <button-center v-on:increment="incrementTotal"></button-center>
      <button-center v-on:increment="incrementTotal"></button-center>
    </div>
    ```
    ```javascript
    Vue.component('button-center', {
      template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
      data: function(){
        //data必须是函数，返回的要是一个对象，不然定义的变量会指向同一个内存
        return {
          counter: 0
        }
      },
      methods: {
        incrementCounter: function(){
          this.counter += 1;
          //子组件$emit触发increment操作，eventName要加冒号，不然就是变量了
          this.$emit('increment');
        }
      }
    });

    new Vue({
      el: '#counter-event-example',
      data: {
        total: 0
      },
      methods: {
        incrementTotal: function(){
          this.total += 1;
        }
      }
    });
    ```

- 给组件绑定原生事件

  在某个组件的根元素上监听一个原生事件。可以使用 `v-on` 的修饰符 `.native`。原生事件触发就不用 `$emit()` 去触发了。例如：
  ```html
  <!--监听原生click事件-->
  <my-component v-on:click.native="doTheThing"></my-component>
  ```

- `.sync`修饰符

  只是作为一个编译时的语法糖存在。它会被拓展为一个自动更新父组件属性的 `v-on` 监听器
  ```html
  <comp :foo.sync="bar"></comp>
  <!-- 会被拓展为 ==> -->
  <comp :foo="bar" @update:foo="val => bar = val"></comp>

  <!-- 多个属性时会添加多个用于用于更新的v-on监听器 -->
  <comp v-bind.sync="{ foo: 1, bar: 2 }"></comp>
  ```
  当子组件需要更新 `foo` 的值时，它需要显式地触发一个更新事件：
  ```javascript
  this.$emit('update:foo', newValue);
  ```

- 使用自定义事件的表单输入组件

  要让组件的 `v-model` 生效，它应该：
  - 接受一个 `value` prop
  - 在有新的值时触发 `input` 事件并将新值作为参数

```html
<div id="currency-event-example">
  <currency-input v-model="price"></currency-input>
</div>
```
```javascript
Vue.component('currency-input', {
  template: '\
      <span>\
        $\
        <input\
          ref="input"\
          v-bind:value="value"\
          v-on:input="updateValue($event.target.value)"\
        >\
      </span>\
    ',
    props: ['value'],
    methods: {
      // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
      updateValue: function (value) {
        var formattedValue = value
          // 删除两侧的空格符
          .trim()
          // 保留 2 位小数
          .slice(
            0,
            value.indexOf('.') === -1
              ? value.length
              : value.indexOf('.') + 3
          )
        // 如果值尚不合规，则手动覆盖为合规的值
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue
        }
        // 通过 input 事件带出数值
        this.$emit('input', Number(formattedValue))
      }
    }
});

new Vue({
  el: '#currency-event-example',
  data: {
    price: ''
  }
});
```

- 自定义组件的 `v-model`

  一个组件的 `v-model` 会使用 `value` prop 和 `input` 事件。但是诸如单选框、复选框之类的输入类型可能把 `value` 用作了别的目的。`model` 选项可以避免这样的冲突：
  ```javascript
  Vue.component('my-checkbox', {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean,
      // 这样就允许拿 `value` 这个 prop 做其它事了
      value: String
    },
    // ...
  });
  ```
  ```html
  <my-checkbox v-model="foo" value="some value"></my-checkbox>
  <!-- 这时等价于 ==> -->
  <my-checkbox
    :checked="foo"
    @change="val => { foo = val }"
    value="some value">
  </my-checkbox>
  ```

- 非父子组件的通信

```javascript
//使用一个空的Vue实例作为事件总栈
var bus = new Vue();

//触发组件A中的事件
bus.$emit('id-selected', 1);

//在组件B中创建的钩子中的监听事件
bus.$on('id-selected', function (id) {
  // ...
});
```

## 使用插槽(`<slot>`元素)分发内容
- 编译作用域
  
  组件的作用域：父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
  ```html
  <div id="compiling-scope-1">
    <!--无效：Property or method "someChildProperty" is not defined on the instance but referenced during render-->
    <child-component v-show="someChildProperty"></child-component>

    <child-component></child-component>
  </div>
  ```
  ```javascript
  new Vue({
    el: '#compiling-scope-1',
    components: {
      childComponent: {
        // 有效，因为是在正确的作用域内
        template: '<div v-show="someChildProperty">Child</div>',
        data: function(){ //data必须是函数
          return {
            someChildProperty: true
          }
        }
      }
    }
  });
  ```

- 单个插槽

  除非子组件模板包含至少一个 ｀<slot>｀ 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。
  ```html
  <div id="single-slot">
    <h1>这是父组件的标题</h1>
    <!-- 没有slot标签my-component中的内容都会被丢弃 -->
    <my-component>
      <!-- 要分发的内容 -->
      <p>这是一些初始内容</p>
      <p>这是更多的初始内容</p>
    </my-component>
  </div>
  ```
  ```javascript
  new Vue({
    el: '#single-slot',
    components: {
      myComponent: {
        template: `<div>
          <h2>这是子标题</h2>
          <slot>
            只有在没有要分发的内容时才会显示，这里分发的内容是my-component中的两个p标签
          </slot>
        </div>`
      }
    }
  });
  ```
  渲染结果：
  ```html
  <div id="single-slot">
    <h1>这是父组件的标题</h1> 
    <div>
      <h2>这是子标题</h2> 
      <p>这是一些初始内容</p>
      <p>这是更多的初始内容</p>
    </div>
  </div>
  ```

- 具名插槽
  +  `<slot>` 元素可以用一个特殊的特性 `name` 来进一步配置如何分发内容。多个插槽可以有不同的名字。具名插槽将匹配内容片段中有对应 `slot` 特性的元素。
  + 仍然可以有一个匿名插槽，它是默认插槽，作为找不到匹配的内容片段的备用插槽。如果没有默认插槽，这些找不到匹配的内容片段将被抛弃

  ```html
  <div id="name-slot">
    <app-layout>
        <h1 slot="header">这里可能是一个页面标题</h1>

        <p>主要内容的一个段落。</p>
        <p>另一个主要段落。</p>

        <p slot="footer">这里有一些联系信息</p>
    </app-layout>
  </div>
  ```
  ```javascript
  //slot为插槽，有name属性的为具名插槽，单纯只有slot标签的是匿名插槽
  new Vue({
    el: '#name-slot',
    components: {
      appLayout: {
        template: `<div class="container">
            <header>
              <slot name="header"></slot>
            </header>
            <main>
              <slot></slot>
            </main>
            <footer>
              <slot name="footer"></slot>
            </footer>
        </div>`
      }
    }
  });
  ```
  渲染结果：
  ```html
  <div class="container">
    <header>
      <h1>这里可能是一个页面标题</h1>
    </header>
    <main>
      <p>主要内容的一个段落。</p>
      <p>另一个主要段落。</p>
    </main>
    <footer>
      <p>这里有一些联系信息</p>
    </footer>
  </div>
  ```

- 作用域插槽
  + 作用域插槽是一种特殊类型的插槽，用作一个 (能被传递数据的) 可重用模板，来代替已经渲染好的元素
  + 2.5.0+以前的示例：
  ```html
  <div id="slot-scope-1">
    <div class="parent">
      <child>
        <!-- 2.5.0+以前，在父级中，具有特殊特性的slot-scope和<template>元素必须存在 -->
        <template slot-scope="props">
          <span>hello from parent</span>
          <span>{{props.text}}</span>
        </template>
      </child>
    </div>
  </div>
  ```
  ```javascript
  new Vue({
    el: '#slot-scope-1',
    components: {
      'child': {
        template: `<div class="child">
          <!-- 数据传递到插槽 -->
          <slot text="hello from child"></slot>
        </div>`
      }
    }
  });
  ```
  + 在 2.5.0+，`slot-scope` 能被用在任意元素或组件中而不再局限于 `<template>`
  ```html
  <!-- 在列表组件中，允许使用者自定义如何渲染列表的每一项： -->
  <div id="slot-scope-2">
    <!-- 前面的items属于子组件的，后面的items属于父组件的 -->
    <my-awesome-list :items="items">
      <!-- 作用域插槽也可以是具名的，slot-scope可以放在任意元素或组件中 -->
      <li
        slot="item"
        slot-scope="props"
        class="my-fancy-item">{{ props.text }}</li>
    </my-awesome-list>
  </div>
  ```
  ```javascript
  new Vue({
    el: '#slot-scope-2',
    data: {
      items: [
        {text: 'chen'},
        {text: 'wei'},
        {text: 'liang'}
      ]
    },
    components: {
      'my-awesome-list': {
        template: `<ul>
          <slot name="item"
            v-for="item in items"
            :text="item.text">
            <!-- 这里写入备用内容 -->
          </slot>
        </ul>`,
        props: ['items']    //父组件通过prop传递数据给子组件
      }
    }
  });
  ```

  + 解构

  `slot-scope` 的值实际上是一个可以出现在函数签名参数位置的合法的 JavaScript 表达式。在表达式中使用ES2015解构：
  ```html
  <child>
    <span slot-scope="{ text }">{{ text }}</span>
  </child>
  ```

## 动态组件
- 通过使用保留的 `<component>` 元素，并对其 `is`  特性进行动态绑定，可以在同一个挂载点动态切换多个组件：
```html
<div id="active-component">
    <input type="button" value="changeLight" @click="changeLight" />
    <br/>
    <component v-bind:is="currentview">
    <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
</div>
```
```javascript
var vm = new Vue({
    el: '#active-component',
    data: {
        currentview: 'red',
    },
    methods:{
        changeLight: function(){
            this.currentview = this.currentview == 'red' ? 'green' : 'red';
        }
    },
    components: {
        red: {
            template: '<h2>Red</h2>'
        },
        green: {
            template: '<h2>Green</h2>'
        }
    }
})
//也可以直接绑定到组件对象上
var Red = {
  template: '<h2>Red</h2>'
}
var vm = new Vue({
  el: '#active-component',
  data: {
    currentView: Red
  }
})
```
- 添加`keep-alive`指令参数可以把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染
```html
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```

## 杂项
- 编写可复用组件
##### Vue组件的API来自三部分－－prop、事件和插槽：
    - Prop 允许外部环境传递数据给组件；
    - 事件允许从组件内触发外部环境的副作用；
    - 插槽允许外部环境将额外的内容组合在组件中。
    ```html
    <!-- 使用 v-bind 和 v-on 的简写语法，模板的意图会更清楚且简洁：-->
    <my-component
      :foo="baz"
      :bar="qux"
      @event-a="doThis"
      @event-b="doThat"
    >
      <img slot="icon" src="...">
      <p slot="main-text">Hello!</p>
    </my-component>
    ```

- 子组件引用

  在Javascript中直接访问子组件，可以使用 `ref` 为子组件指定一个引用ID
  ```html
 <div id="parent">
      <user-profile ref="profile" v-for="item in items" :item="item"></user-profile>
  </div>
  ```
  ```javascript
  var parent = new Vue({
    el: '#parent',
    data: {
      items: [
        {text: 1},
        {text: 2}
      ]
    },
    components: {
      'user-profile': {
        props: ['item'],
        template: '<p>{{ item.text }}</p>',
      }
    }
  });

  var childs = parent.$refs.profile;
  console.log(childs); //输出的是一个数组
  ```
  ##### 注意：
    - 当 `ref` 和 `v-for` 一起使用时，获取到的引用会是一个数组，包含和循环数据源对应的子组件。
    - `$refs` 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅是一个直接操作子组件的应急方案——应当避免在模板或计算属性中使用 `$refs`。

- 异步组件
  + 将组件定义为一个工厂函数，异步地解析组件的定义。Vue.js只在组件需要渲染时触发工厂函数，并且将结果缓存起来，用于后面的再次渲染。例如：
  ```javascript
  Vue.component('async-example', function (resolve, reject) { //可以调用 reject(reason) 指示加载失败
    setTimeout(function () {
      // 将组件定义传入 resolve 回调函数
      resolve({ //接收一个 resolve 回调，在收到从服务器下载的组件定义时调用
        template: '<div>I am async!</div>'
      })
    }, 1000)
  });
  ```
  + 获取组件可以配合 `webpack` 的代码分割功能 来使用：
  ```javascript
  Vue.component('async-webpack-example', function (resolve) {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 Ajax 请求自动下载。
    require(['./my-async-component'], resolve)
  });
  ```
  + `webpack2` + `ES6`的语法在工厂函数函数中返回一个 `Promise`：
  ```javascript
  Vue.component(
    'async-webpack-example',
    // 该 `import` 函数返回一个 `Promise` 对象。
    () => import('./my-async-component')
  );
  ```

- 高级异步组件

  自 2.3.0 起，异步组件的工厂函数也可以返回一个如下的对象：
  ```javascript
  const AsyncComp = () => ({
    // 需要加载的组件。应当是一个 Promise
    component: import('./MyComp.vue'),
    // 加载中应当渲染的组件
    loading: LoadingComp,
    // 出错时渲染的组件
    error: ErrorComp,
    // 渲染加载中组件前的等待时间。默认：200ms。
    delay: 200,
    // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
    timeout: 3000
  });
  ```

- 组件命名约定
  + 当注册组件 (或者 `prop`) 时，可以使用 kebab-case (短横线分隔命名)、camelCase (驼峰式命名) 或 PascalCase (单词首字母大写命名)。
  ```javascript
  // 在组件定义中
  components: {
    // 使用 kebab-case 注册
    'kebab-cased-component': { /* ... */ },
    // 使用 camelCase 注册
    'camelCasedComponent': { /* ... */ },
    // 使用 PascalCase 注册
    'PascalCasedComponent': { /* ... */ }
  }
  ```
  ```html
  <!-- 在 HTML 模板中始终使用 kebab-case -->
  <kebab-cased-component></kebab-cased-component>
  <camel-cased-component></camel-cased-component>
  <pascal-cased-component></pascal-cased-component>
  ```
  + 当使用字符串模式时，可以不受 HTML 大小写不敏感的限制。这意味实际上在模板中，可以使用下面的方式来引用组件：
    - kebab-case
    - camelCase 或 kebab-case (如果组件已经被定义为 camelCase)
    - kebab-case、camelCase 或 PascalCase (如果组件已经被定义为 PascalCase)
    ```javascript
    components: {
      'kebab-cased-component': { /* ... */ },
      camelCasedComponent: { /* ... */ },
      PascalCasedComponent: { /* ... */ }
    }
    ```
    ```html
    <kebab-cased-component></kebab-cased-component>
    <camel-cased-component></camel-cased-component>
    <camelCasedComponent></camelCasedComponent>
    <pascal-cased-component></pascal-cased-component>
    <pascalCasedComponent></pascalCasedComponent>
    <PascalCasedComponent></PascalCasedComponent>
    ```
    ##### 总结： 在字符串模板中，PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定

- 递归组件
  + 组件在它的模板内可以递归调用自己。不过，只有当它有 `name` 选项时才可以这么做：
  ```javascript
  name: 'unique-name-of-my-component'
  ```
  + 当利用 `Vue.component` 全局注册了一个组件，全局的 ID 会被自动设置为组件的 `name`。
  ```javascript
  Vue.component('unique-name-of-my-component', {
    // ...
  });
  ```
  + 要确保递归调用有终止条件(比如递归调用时使用 `v-if` 并最终解析为 `false` )

- 组件间的循环引用
  + 当两个组件同时为对方的父节点和子节点--这是矛盾的。当使用 `Vue.component` 将这两个组件注册为全局组件的时候，框架会解决这个矛盾
  + 使用诸如 `webpack` 或者 `Browserify` 之类的模块化管理工具来 `require/import` 组件的话，就会有问题。假设引起矛盾的子组件是 `tree-folder-contents`，所以可以等到 `beforeCreate` 生命周期钩子中才去注册它：
  ```javascript
  beforeCreate: function () {
    this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
  }
  ```

- 内联模板

  如果子组件有 `inline-template` 特性，组件将把它的内容当作它的模板，而不是把它当作分发内容
  ```html
  <my-component inline-template>
    <div>
      <p>这些将作为组件自身的模板。</p>
      <p>而非父组件透传进来的内容。</p>
    </div>
  </my-component>
  ```

- X-Template

  另一种定义模板的方式是在 JavaScript 标签里使用 `text/x-template` 类型，并且指定一个 id：
  ```javascript
  <script type="text/x-template" id="hello-world-template">
    <p>Hello hello hello</p>
  </script>

  Vue.component('hello-world', {
    template: '#hello-world-template'
  });
  ```
- 对低开销的静态组件使用 `v-once`
  
  尽管在 Vue 中渲染 HTML 很快，不过当组件中包含大量静态内容时，可以考虑使用 `v-once` 将渲染结果缓存起来，就像这样：
  ```javascript
  Vue.component('terms-of-service', {
    template: '\
      <div v-once>\
        <h1>Terms of Service</h1>\
        ...很多静态内容...\
      </div>\
    '
  });
  ```






