# 渲染函数 & JSX

## 基础
- 在一些场景中，可能需要 JavaScript 的完全编程的能力来创建HTML，这就是 `render` 函数，它比 template 更接近编译器
```html
<div id="example-1">
    <anchored-heading :level="2">Hello world!</anchored-heading>
</div>
```
```javascript
Vue.component('anchored-heading', {
    render: function(createElement){
        return createElement(
            'h' + this.level,   // tag name 标签名称
            /*
            * 用来访问被插槽分发的内容。每个具名插槽 有其相应的属性 (例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到)。default 属性包括了所有没有被包含在具名插槽中的节点
             */
            this.$slots.default //子组件中的阵列
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
});

new Vue({
    el: '#example-1'
});
```

## 节点、树以及虚拟 DOM
- 虚拟 DOM

Vue通过建立一个虚拟 DOM 对真实 DOM 发生的变化保持追踪。在 `return createElement('h1', this.blogTitle)` 中，`createElement`更准确的名字可能是 `createNodeDescription`，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。这样的节点描述为“虚拟节点 (Virtual Node)”，也常简写它为“VNode”。“虚拟 DOM”是对由 Vue 组件树建立起来的整个 VNode 树的称呼。

## `createElement`参数
`createElement` 接受的参数：
```javascript
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者一个返回值
  // 类型为 String/Object 的函数，必要参数
  'div',

  // {Object}
  // 一个包含模板相关属性的数据对象
  // 这样，可以在 template 中使用这些属性。可选参数。
  {
    // 看下一节
  },

  // {String | Array}
  // 子节点 (VNodes)，由 `createElement()` 构建而成，
  // 或使用字符串来生成“文本节点”。可选参数。
  [
    '先写一些文字',       //字符串生成文本子节点
    createElement('h1', '一则头条'),        //h1标签加文字
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
);
```
- 深入data对象

在 VNode 数据对象中，下列属性名是级别最高的字段。该对象也允许绑定普通的 HTML 特性，就像 DOM 属性一样，比如 `innerHTML` (这会取代 `v-html` 指令)
```javascript
{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。无法对 `binding` 中的 `oldValue`赋值，因为 Vue 已经自动进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```
- 完整示例
```html
<div id="example-2">
    <anchored-heading-2 :level="1" :id="msg">HEllo WOrld!</anchored-heading-2>
</div>
```
```javascript
var getChildrenTextContent = function (children) {
    console.log(children); //[VNode, VNode]
    //map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
    return children.map(function (node) {
        return node.children
            ? getChildrenTextContent(node.children)
            : node.text
    }).join('')   //join() 方法用于把数组中的所有元素放入一个字符串
}

Vue.component('anchored-heading-2', {
    render: function (createElement) {
        // create kebabCase id
        var headingId = getChildrenTextContent(this.$slots.default)
            .toLowerCase()
            .replace(/\W+/g, '-')
            .replace(/(^\-|\-$)/g, '')

        return createElement(
            'h' + this.level,
            {   //data 对象
                'class': {
                    foo: true,
                    bar: false
                },
                on: {
                    //this指的是<anchored-heading-2>这个组件
                    click: this.clickHandler
                }
            },
            [   //子节点
                createElement('a', { //data对象
                    attrs: {
                        name: headingId,
                        href: '#' + headingId
                    },
                    style: {
                        color: 'red',
                        fontSize: '20px'
                    }
                }, this.$slots.default)
            ]
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    methods: {
        clickHandler: function(){
            console.log("test");
        }
    }
});

new Vue({
    el: '#example-2',
    data: {
        msg: 'child-node'
    }
});
```
编译成
```html
<div id="example-2">
    <h1 class="foo" id="child-node">
        <a name="hello-world" href="#hello-world" style="color: red; font-size: 20px;">HEllo WOrld!</a>
    </h1>
</div>
```
- 约束

    组件树中的所有的VNodes必须是唯一的。如果需要重复很多的元素或者组件，可以用工厂函数来实现。
    ```javascript
    render: function (createElement) {
      return createElement('div',
        Array.apply(null, { length: 20 }).map(function () {
          return createElement('p', 'hi')
        })
      )
    }
    ```

## 使用JavaScript代替模板功能
- `v-if` 和 `v-for` 可以在 `render` 函数中被JavaScript的 `if` / `else` 和 `map` 重写：
```javascript
props: ['items'],
render: function (createElement) {
    if (this.items.length) {
        return createElement('ul', this.items.map(function (item) {
            return createElement('li', item.name)
        }))
    } else {
        return createElement('p', 'No items found.')
    }
}
```
- `v-model` 用JavaScript实现：
```javascript
props: ['value'],
render: function (createElement) {
    var self = this;
    return createElement('input', {
        domProps: { //DOM 属性
            value: self.value
        },
        on: {
            input: function (event) {
                self.$emit('input', event.target.value)
            }
        }
    });
}
```
- 事件 & 按键修饰符 
  - 对于 `.passive`、`.capture` 和 `.once`事件修饰符, Vue 提供了相应的前缀可以用于 `on`：
<table>
<thead>
<tr>
<th>Modifier(s)</th>
<th>Prefix</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>.passive</code></td>
<td><code>&amp;</code></td>
</tr>
<tr>
<td><code>.capture</code></td>
<td><code>!</code></td>
</tr>
<tr>
<td><code>.once</code></td>
<td><code>~</code></td>
</tr>
<tr>
<td><code>.capture.once</code> or<br><code>.once.capture</code></td>
<td><code>~!</code></td>
</tr>
</tbody>
</table>
  
  ```javascript
  on: {
    '!click': this.doThisInCapturingMode,
    '~keyup': this.doThisOnce,
    '~!mouseover': this.doThisOnceInCapturingMode
  }
  ```
  - 对于其他的修饰符，前缀不是很重要，因为可以在事件处理函数中使用事件方法：
    Modifier(s) | Equivalent in Handler
    .stop event.stopPropagation()
    .prevent  event.preventDefault()
    .self if (event.target !== event.currentTarget) return
    Keys:
    .enter, .13 if (event.keyCode !== 13) return (change 13 to another key code for other key modifiers)
    Modifiers Keys:
    .ctrl, .alt, .shift, .meta  if (!event.ctrlKey) return (change ctrlKey to altKey, shiftKey, or metaKey, respectively)