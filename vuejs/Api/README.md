# API
## 全局配置
`Vue.config` 是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性：

- `silent`(boolean, default: false)
```javasctipt
Vue.config.silent = true;   //取消 Vue 所有的日志与警告
```
- `optionMergeStrategies`({ [key: string]: Function },default: {})：自定义合并策略的选项。

合并策略选项分别接收在父实例和子实例上定义的该选项的值作为第一个和第二个参数，Vue 实例上下文被作为第三个参数传入。
```javasctipt
Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
  return child + 1
}

const Profile = Vue.extend({
  _my_option: 1
})

// Profile.options._my_option = 2
```

- `devtools`(boolean, default: true[生产版为false])：配置是否允许 `vue-devtools` 检查代码。开发版本默认为 `true`，生产版本默认为 `false`。生产版本设为 `true` 可以启用检查
```javasctipt
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true
```

- `errorHandler`(Function, default: undefined)：指定组件的渲染和观察期间未捕获错误的处理函数
```javasctipt
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}
```
- `warnHandler`(Function, default: undefined)：为 Vue 的运行时警告赋予一个自定义处理函数
```javasctipt
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}
```

- `ignoredElements`(`Array<string | RegExp>)`, default: [])：须使 Vue 忽略在 Vue 之外的自定义元素
```javasctipt
Vue.config.ignoredElements = [
  'my-custom-web-component',
  'another-web-component',
  // 用一个 `RegExp` 忽略所有“ion-”开头的元素
  // 仅在 2.5+ 支持
  /^ion-/
]
```

- `keyCodes`(`{ [key: string]: number | Array<number> }`, default: {})：给 v-on 自定义键位别名
```javasctipt
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}
```
```html
<input type="text" @keyup.media-play-pause="method">
```

- `performance`(boolean, default: false)：设置为 `true` 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 `performance.mark` API 的浏览器上(2.2.0新增)

- `productionTip`(boolean, default: true)：设置为 `false` 以阻止 vue 在启动时生成生产提示。(2.2.0新增)

## 全局API
- `Vue.extend( options )`：使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象
```html
<div id="mount-point"></div>
```
```javasctipt
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {   //data必须是函数
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point');
```
渲染结果：
```html
<p>Walter White aka Heisenberg</p>
```

- `Vue.nextTick( [callback, context] )`：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
```javasctipt
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  });
```

- `Vue.set( target, key, value )`：设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。(**target不能是 Vue 实例，或者 Vue 实例的根数据对象** )
- `Vue.delete( target, key )`：删除对象的属性。如果对象是响应式的，确保删除能触发更新视图(**target不能是一个 Vue 实例或 Vue 实例的根数据对象**)
- `Vue.directive( id, [definition] )` ：注册或获取全局指令
```javasctipt
// 注册
Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})

// 注册 (指令函数)
Vue.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
```
- `Vue.filter( id, [definition] )`：注册或获取全局过滤器
```javasctipt
// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```
- `Vue.component( id, [definition] )`：注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
```javasctipt
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
```
- `Vue.use( plugin )`：安装 Vue.js 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
- `Vue.mixin( mixin )`：全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。可以使用混入，向组件注入自定义的行为
- `Vue.compile( template )`：在 `render`  函数中编译模板字符串。只在独立构建时有效
```javasctipt
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
});
```
- `Vue.version`：提供字符串形式的 Vue 安装版本号
```javasctipt
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```

## 选项/数据
- `data`
  + 类型：`Object` | `Function`(组件只接受 `Function`)
  + 可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象
  + 示例：
  ```javasctipt
  var data = { a: 1 }

  // 直接创建一个实例
  var vm = new Vue({
    data: data
  })
  vm.a // => 1
  vm.$data === data // => true

  // Vue.extend() 中 data 必须是函数
  var Component = Vue.extend({
    data: function () {
      return { a: 1 }
    }

    data: vm => ({ a: vm.myProp })   // 箭头函数方式，实例作为函数的第一个参数
  });
  ```
- `props`
  + 类型：`Array<string>` | `Object`
  + 详细：`props` 可以是数组或对象，用于接收来自父组件的数据。`props` 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。
  + 示例：
  ```javasctipt
  // 简单语法
  Vue.component('props-demo-simple', {
    props: ['size', 'myMessage']
  })

  // 对象语法，提供校验
  Vue.component('props-demo-advanced', {
    props: {
      // 检测类型
      height: Number,
      // 检测类型 + 其他验证
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
          return value >= 0
        }
      }
    }
  });
  ```
- `propsData`
  + 类型：`{ [key: string]: any }`
  + 详细：创建实例时传递 `props`。主要作用是方便测试。只用于 `new` 创建的实例中
  + 示例：
  ```javasctipt
  var Comp = Vue.extend({
    props: ['msg'],
    template: '<div>{{ msg }}</div>'
  });

  var vm = new Comp({
    propsData: {
      msg: 'hello'
    }
  });
  ```
- `computed` 计算属性
  + 类型：`{ [key: string]: Function | { get: Function, set: Function } }`
  + 示例：
  ```javasctipt
  var vm = new Vue({
    data: { a: 1 },
    computed: {
      // 仅读取
      aDouble: function () {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get: function () {
          return this.a + 1
        },
        set: function (v) {
          this.a = v - 1
        }
      }
    }
  })
  vm.aPlus   // => 2
  vm.aPlus = 3  //用了set
  vm.a       // => 2
  vm.aDouble // => 4
  ```
- `methods`
  + 类型：`{ [key: string]: Function }`
  + 详细：`methods` 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 Vue 实例。**不应该使用箭头函数来定义 `method` 函数**
  + 示例：
  ```javasctipt
  var vm = new Vue({
    data: { a: 1 },
    methods: {
      plus: function () {
        this.a++
      }
    }
  })
  vm.plus()
  vm.a // 2
  ```
- `watch`
  + 类型：`{ [key: string]: string | Function | Object | Array }`
  + 详细：一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 `$watch()`，遍历 `watch` 对象的每一个属性。**不应该使用箭头函数来定义 watcher 函数**
  + 示例：
  ```javasctipt
  var vm = new Vue({
    data: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: {
        f: {
          g: 5
        }
      }
    },
    watch: {  // 监听函数，值有改变就触发
      a: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      },
      // 方法名
      b: 'someMethod',
      // 深度 watcher
      c: {
        handler: function (val, oldVal) { /* ... */ },
        deep: true
      },
      // 该回调将会在侦听开始之后被立即调用
      d: {
        handler: function (val, oldVal) { /* ... */ },
        immediate: true
      },
      e: [
        function handle1 (val, oldVal) { /* ... */ },
        function handle2 (val, oldVal) { /* ... */ }
      ],
      // watch vm.e.f's value: {g: 5}
      'e.f': function (val, oldVal) { /* ... */ }
    }
  })
  vm.a = 2 // => new: 2, old: 1
  ```

## 选项/DOM
- `el`
  + 类型：`string | HTMLElement`
  + 详细：提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。如果 `render` 函数和 `template` 属性都不存在，挂载 DOM 元素的 HTML 会被提取出来用作模板
- `template`
  + 类型：`string`
  + 详细：一个字符串模板作为 Vue 实例的标识使用。模板将会 **替换** 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。如果 Vue 选项中包含渲染函数，该模板将被忽略。
- `render`
  + 类型：`(createElement: () => VNode) => VNode`
  + 详细：字符串模板的代替方案，允许发挥 JavaScript 最大的编程能力。该渲染函数接收一个 `createElement` 方法作为第一个参数用来创建 `VNode`。如果组件是一个函数组件，渲染函数还会接收一个额外的 `context` 参数，为没有实例的函数组件提供上下文信息
  + 示例：
  ```javasctipt
  Vue.component('anchored-heading', {
    render: function(createElement){
      return createElement(
        'h' + this.level, {   // data对象
            style: {
                color: 'red',
                fontSize: '20px'
            }
        }
        /*
        - 用来访问被插槽分发的内容。每个具名插槽 有其相应的属性 (例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到)。default 属性包括了所有没有被包含在具名插槽中的节点
         */
        this.$slots.default // 子组件中的阵列，context参数
      )
    }
  });
  ```
- renderError(2.2.0新增)
  + 类型：`(createElement: () => VNode, error: Error) => VNode`
  + 详细：只在开发者环境下工作。当 `render` 函数遭遇错误时，提供另外一种渲染输出。其错误将会作为第二个参数传递到 `renderError`。这个功能配合 hot-reload 非常实用
  + 示例：
  ```javasctipt
  new Vue({
    render (h) {
      throw new Error('oops')
    },
    renderError (h, err) {
      return h('pre', { style: { color: 'red' }}, err.stack)
    }
  }).$mount('#app');
  ```

## 选项 / 生命周期钩子
- beforeCreate
- created
- beforeMount
- mounted
  + `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子
  + 要等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`：
  ```javasctipt
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  }
  ```
- beforeUpdate
- updated
- activated
  + 类型：`Function`
  + 详细：`keep-alive` 组件激活时调用
- deactivated
  + 类型：`Function`
  + 详细：`keep-alive` 组件停用时调用。
- deforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用
- destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
- errorCaptured(2.5.0+新增)
  + 类型：`(err: Error, vm: Component, info: string) => ?boolean`
  + 详细：当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。

## 选项/资源
- `directives`
- `filters`
- `components`

## 选项/组合
- parent
- mixins
  + 类型：`Array<Object>`
  + 详细：`mixins` 选项接受一个混入对象的数组。这些混入实例对象可以像正常的实例对象一样包含选项，他们将在 `Vue.extend()` 里最终选择使用相同的选项合并逻辑合并。举例：如果混入包含一个钩子而创建组件本身也有一个，两个函数将被调用。Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
  + 示例：
  ```javasctipt
  var mixin = {
    created: function () { console.log(1) }
  }
  var vm = new Vue({
    created: function () { console.log(2) },
    mixins: [mixin]
  })
  // => 1
  // => 2
  ```
- `extends`
  + 类型：`Object | Function`
  + 详情：允许声明扩展另一个组件(可以是一个简单的选项对象或构造函数)，而无需使用 `Vue.extend`。这主要是为了便于扩展单文件组件
  + 示例：
  ```javasctipt
  var CompA = { ... }

  // 在没有调用 `Vue.extend` 时候继承 CompA
  var CompB = {
    extends: CompA,
    ...
  }
  ```
- `provide / inject`(2.2.0新增)
  + 类型：
    - provide：`Object | () => Object`
    - inject：`Array<string> | { [key: string]: string | Symbol | Object }`

## 选项/其它
- `name`
  + 类型：`string`
  + 限制：只有作为组件选项时起作用。
  + 详细：允许组件模板递归地调用自身。注意，组件在全局用 `Vue.component()` 注册时，全局 ID 自动作为组件的 `name`
- `delimiters`
  + 类型：`Array<string>`
  + 默认值：`["{{", "}}"]`
  + 限制：这个选项只在完整构建版本中的浏览器内编译时可用。
  + 详细：改变纯文本插入分隔符
  + 示例：
  ```javasctipt
  new Vue({
    delimiters: ['${', '}']
  });
  ```
- `functional`
  + 类型：`boolean`
  + 详细：使组件无状态 (没有 `data` ) 和无实例 (没有 `this` 上下文)。他们用一个简单的 `render` 函数返回虚拟节点使他们更容易渲染
- `model`(2.2.0新增)
