# 自定义指令
在 Vue2.0 中，代码复用和抽象的主要形式是组件。在某些情况下，Vue 提供的指令是非常不够的，比如有一个输入框需要在点击的时候能弹出日期控件，这个功能 Vue 并不支持，但 Vue 支持自定义指令。

## 全局指令和局部指令
- 全局自定义指令
```html
<div id="global-directive-demo">
    <input type="text" value="" v-focus="" />
</div>
<script>
    //注册一个全局自定义指令  `v-focus`
    //当元素使用了 v-focus 这个指令时会触发对应的 function
    //参数el：使用指令的元素
    Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时......
        inserted: function(el){
            //对DOM元素进行底层操作
            el.focus();
            el.value = '世界和平'
        }
    });

    new Vue({
        el: '#global-directive-demo'
    })
</script>
```
- 局部自定义指令
```html
<div id="private-directive-demo">
    <input type="text" value="" v-private="" />
</div>
<script>
    new Vue({
        el: '#private-directive-demo',
        directives: {
            private: function(el){
                el.style.background = '#ccc';
                el.value = 'private'
            }
        }
    })
</script>
```

## 钩子函数
钩子函数可以理解为指令的声明周期

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。先于 `inserted` 触发
- `inserted`：被绑定元素插入父节点时调用。后于 `bind` 触发
- `update`：被绑定元素所在的模板更新时调用，而不论绑定值是否变化
- `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用
- `unbind`：只调用一次，指令与元素解绑时调用
```html
<div id="hook-example">
    <input type="text" v-model="text" v-function="{color:'red'}">
</div>
<script>
     Vue.directive('function', {
        //默认触发此方法 Vue.directive('function',  function(element){})
        inserted: function(element, binding, vnode){
            console.log('inserted');
        },
        bind: function(element, binding, vnode){
            console.log('bind');
            element.style.color = binding.value.color //binding.value为{color: 'red'}
        },
        update: function(element, binding, vnode){
            console.log('update');
        },
        componentUpdated: function(element, binding, vnode){
            console.log('componentUpdated');
        }
    })

    var vm = new Vue({
        el: '#hook-example',
        data:{
            text: '钩子函数'
        }
    });
</script>
```

## 钩子函数的参数(`el`, `binding`, `vnode`, `oldVnode`)
除了 `el` 之外，其它参数都应该是只读的，不能进行修改。如果需要在钩子之间共享数据，可以通过元素的 `dataset` 来进行

- `el`：指令所绑定的元素，可以用来直接操作 DOM
- `binding`：使用指令的属性对象
    + `name`：指令名，不包括 `v-` 前缀
    + `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`
    + `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated`钩子中可用。无论值是否改变都可用
    + `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`
    + `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`
    + `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`
- `vnode`：Vue 编译生成的虚拟节点，即整个 Vue 实例
- `olaVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用
```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
<script>
    Vue.directive('demo', {
      bind: function (el, binding, vnode) {
        var s = JSON.stringify
        el.innerHTML =
          'name: '       + s(binding.name) + '<br>' +
          'value: '      + s(binding.value) + '<br>' +
          'expression: ' + s(binding.expression) + '<br>' +
          'argument: '   + s(binding.arg) + '<br>' +
          'modifiers: '  + s(binding.modifiers) + '<br>' +
          'vnode keys: ' + Object.keys(vnode).join(', ')    //Object.keys() 枚举数组的属性名
      }
    })

    new Vue({
      el: '#hook-arguments-example',
      data: {
        message: 'hello!'
      }
    });
</script>
```

## 函数简写
在很多时候，可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写:
```javascript
Vue.directive('color-swatch', function (el, binding) {
    el.style.backgroundColor = binding.value
});
```

## 对象字面量
如果指令需要多个值，可以传入一个 JavaScript 对象字面量。指令函数能够接受所有合法的 JavaScript 表达式

```html
<div id="objectString">
    <div v-string="{ color: 'white', text: 'hello!', showText: '这是el.binding.value绑定的值' }"></div>
</div>
<script>
    new Vue({
        el: '#objectString',
        directives: {
            string: function(el, binding){
                console.log(binding.value.color) // => "white"
                console.log(binding.value.text)  // => "hello!"
                el.innerHTML = binding.value.showText;
            }
        }
    });
</script>
```

## $set介绍
当实例对象 `data` 先设置好了结构，比如：`data: {dataform: {}}`，在后期想添加一个属性 `username` 时，这个 `username` 不会自动绑定到视图当中，所以调用 `vm.$set(原对象，新属性名，属性值)` 进行绑定到视图当中
```html
<div id="set-example">
    <input type="button" value="set" @click="set">
    <p><span>{{dataform.username}}</span></p>
</div>
<script>
    var vm = new Vue({
        el: '#set-example',
        data: {
            dataform: {}
        },
        methods: {
            set: function(){
                // 直接赋值不会显示在视图上
                // this.dataform.username = '123'
                // 改用 $set 更新可以在视图上显示
                this.$set(this.dataform, 'username', '新添加的字符串')
            }
        }
    });
</script>
```


