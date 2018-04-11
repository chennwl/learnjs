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
