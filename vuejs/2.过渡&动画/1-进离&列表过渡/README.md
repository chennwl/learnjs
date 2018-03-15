# 进入/离开 & 列表过渡
## 过渡效果
SPA 中组件的切换有一种生硬的隐藏显示感觉，为了更好的用户体验，让组件切换时淡出淡入，Vue 提供了专门的组件 `<transition>`。可以使用下列的工具来实现过渡效果：
- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

## 单元素/组建的过渡
- 过渡应用场景(在下列情况下，可以给任何元素和组件添加 entering/leaving 过渡)
    + 条件渲染 (使用 `v-if`)
    + 条件展示 (使用 `v-show`)
    + 动态组件
    + 组件根节点

- 过渡的状态类名
    + `v-enter`:定义进入过渡的开始状态。在元素被插入时生效（初始状态）
    + `v-enter-active`:定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 `transition/animation` 完成之后移除
    + `v-enter-to`:2.1.8版及以上定义进入过渡的结束状态。在元素被插入一帧时生效（与此同时 `v-enter` 被移除），在 `transition/animation` 完成之后移除。即会跟 `v-enter-active`同时移除
    + `v-leave`:定义离开过渡的开始状态。在离开过渡被触发时生效（初始状态）
    + `v-leave-active`:定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 `transition/animation` 完成之后移除
    + `v-leave-to`:2.1.8版及以上定义离开过渡的结束状态。在离开过渡被触发一帧后生效 (与此同时 `v-leave` 被删除)，在 `transition/animation` 完成之后移除。即会跟 `v-leave-active`同时移除

每个状态在使用的时候都是在 CSS 中使用，v- 是这些类名的前缀。使用 `<transition name="my-transition">` 可以重置前缀，比如 `v-enter` 替换为 `my-transition-enter`。

- CSS过渡(transitions)
```html
<style>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
      transition: all 3s ease;
    }
    .slide-fade-leave-active {
      transition: all 2s cubic-bezier(1.0, 0.5, 0.8, 1.0);  /*贝塞尔曲线*/
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(50px);
      opacity: 0;
    }
    .slide-fade-leave,.slide-fade-enter-to{
        color: red;
    }
</style>
<div id="example-1">
    <button @click="show = !show">点击使用CSS过渡transtion</button>
    <transition name="slide-fade">
        <p v-if="show">hello</p>
    </transition>
</div>
<script>
    new Vue({
        el: '#example-1',
        data: {
            show: true
        }
    });
</script>
```

- CSS动画(animations)

    CSS 动画用法同 CSS 过渡，区别是在动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 `animationend` 事件触发时删除
    ```html
    <style type="text/css">
        .bounce-enter-active {
          animation: bounce-in 2s; /* 0=>1.5=>1 */
        }
        .bounce-leave-active {
          animation: bounce-in 2s reverse;  /* 1=>1.5=>0 */
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
    </style>
    <div id="example-2">
        <button @click="show = !show">点击使用CSS动画animation</button>
        <transition name="bounce">
            <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
        </transition>
    </div>
    <script>
        new Vue({
            el: "#example-2",
            data: {
                show: true
            }
        });
    </script>
    ```

- 自定义过渡的类名（优先级高于普通的类名）
    + `enter-class`
    + `enter-active-class`
    + `enter-to-class` (2.1.8+)
    + `leave-class`
    + `leave-active-class`
    + `leave-to-class` (2.1.8+)
    ```html
    <div id="example-3">
        <button @click="show = !show">点击使用自定义过渡</button>
        <transition name="bounce"
            enter-active-class="animated fadeInDownBig"
            leave-active-class="animated bounceOutRight"
        >
            <p v-if="show">Hello World!</p>
        </transition>
    </div>
    <script>
        new Vue({
            el: '#example-3',
            data: {
                show: true
            }
        })
    </script>
    ```

- 同时使用过渡同动画

    在给同一个元素同时设置两种过渡动效时，比如 `animation` 很快的被触发并完成了，而 `transition` 效果还没结束。在这种情况中，需要使用 `type` 特性并设置 `animation` 或 `transition` 来明确声明需要 Vue 监听的类型

- 显性的过渡持续时间
    
    用 `<transition>` 组件上的 `duration` 属性可以定制一个显性的过渡持续时间 (以毫秒计)：
    ```html
    <transition :duration="1000">...</transition>
    <!-- 定制进入和移出的持续时间 -->
    <transition :duration="{ enter: 500, leave: 800 }">...</transition>
    ```
- JavaScript钩子
    + 可以在属性中声明JavaScript钩子
    ```html
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"

      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <!-- ... -->
    </transition>
    ```
    ```javascript
    // ...
    methods: {-
        // 过渡进入
        // 设置过渡进入之前的组件状态
        beforeEnter: function (el) {
            // ...
        },
        // 设置过渡进入完成时的组件状态
        // done回调函数是可选项的设置
        // 与 CSS 结合时使用
        enter: function (el, done) {
            // ...
            done()
        },
        // 设置过渡进入完成之后的组件状态
        afterEnter: function (el) {
            // ...
        },
        enterCancelled: function (el) {
            // ...
        },

        // 过渡离开
        // 设置过渡离开之前的组件状态
        beforeLeave: function (el) {
            // ...
        },
        // 设置过渡离开完成时地组件状态
        // done回调函数是可选项的设置
        // 与 CSS 结合时使用
        leave: function (el, done) {
            // ...
            done()
        },
        // 设置过渡离开完成之后的组件状态
        afterLeave: function (el) {
            // ...
        },
        // leaveCancelled 只用于 v-show 中
        leaveCancelled: function (el) {
            // ...
        }
    }
    ```
    + 钩子函数可以结合 `transitions/animations` 使用，也可以单独使用
    + 注意： 
        - 当只用 JavaScript 过渡的时候， 在 `enter` 和 `leave` 中，回调函数 `done` 是必须的。否则，它们会被同步调用，过渡会立即完成
        - 对于仅使用 JavaScript 过渡的元素添加 `v-bind:css="false"`，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响

## 初始渲染的过渡
- 节点第一次加载时的过渡效果，使用到组件 `transition` 的属性: `appear` `appear-class` `appear-to-class` `appear-active-class`
```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```
- 自定义钩子
```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

## 多个元素的过渡
- 当有相同标签名的元素切换时，需要通过 `key` 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。
```html
<!-- 示例：带key值 -->
<transition>
    <button v-if="isEditing" key="save">Save</button>
    <button v-else key="edit">Edit</button>
</transition>
```
- 过渡模式(`<transition>`进入和离开的效果默认是同时进行的)
    + `in-out`:新元素先进行过渡，完成之后当前元素过渡离开
    ```html
    <style>
        .mode-translate-fade-enter-active{transition: all 2s;}
        .mode-translate-fade-leave-active{transition: all .5s;}
        .mode-translate-fade-enter,
        .mode-translate-fade-leave-active{opacity: 0;transform: translateX(60px);}
    </style>
    <div id="mode-demo">
        <transition name="mode-translate-fade" mode="out-in">
            <button v-if='on'  key='on' @click='on = false'>ON</button>
            <button v-else='' key='off' @click='on = true'>OFF</button>
        </transition>
    </div>
    <script>
        new Vue({
            el: '#mode-demo',
            data: {
                on: false
            }
        });
    </script>
    ```
    + `out-in`:当前元素先进行过渡，完成之后新元素过渡进入
    ```html
    <style>
    .in-out-translate-demo-wrapper {position: relative;height: 18px;}
    .in-out-translate-demo-wrapper button {position: absolute;}
    .in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {transition: all .5s;}
    .in-out-translate-fade-enter, .in-out-translate-fade-leave-active {opacity: 0;}
    .in-out-translate-fade-enter {transform: translateX(31px);}
    .in-out-translate-fade-leave-active {transform: translateX(-31px);}
    </style>
    <div id="in-out-translate-demo" class="demo">
      <div class="in-out-translate-demo-wrapper">
        <transition name="in-out-translate-fade" mode="in-out">
          <button v-if="on" key="on" @click="on = false">
            on
          </button>
          <button v-else="" key="off" @click="on = true">
            off
          </button>
        </transition>
      </div>
    </div>
    <script>
        new Vue({
            el: '#in-out-translate-demo',
            data: {
                on: false
            }
        });
    </script>
    ```

## 多个组件的过渡(使用动态组件)
```html
<style type="text/css">
    .component-fade-enter-active,
    .component-fade-leave-active{transition: all .5s ease-in;}
    .component-fade-enter,
    .component-fade-leave-active{opacity: 0;}
</style>
<div id="transition-components-demo" class="demo">
    <input v-model="view" type="radio" value="v-a" id="a" name="view"><label for="a">A</label>
    <input v-model="view" type="radio" value="v-b" id="b" name="view"><label for="b">B</label>
  <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
  </transition>
</div>
<script>
    new Vue({
        el: "#transition-components-demo",
        data: {
            view: 'v-a'
        },
        components: {
            'v-a': {
                template: '<p>This is A view</p>'
            },
            'v-b': {
                template: '<p>This is B view</p>'
            }
        }
    })
</script>
```

## 列表(v-for)过渡
- `transition-group` 介绍
    - `v-for` 生成列表过渡效果要使用组件 `transition-group`，它默认以一个 `<span>`元素呈现。组件提供属性 `tag` 可以更换为其他元素，其它的使用和 `transition` 一样。
    - 内部元素总是需要提供唯一的 `key` 属性值
- 列表的进入/离开过渡
```html
<style type="text/css">
    .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
    }
</style>
<div id="list-demo" class="demo">
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="list" tag="h4" style="color: red;">
        <!-- key是必须的 -->
        <span v-for="item in items" v-bind:key="item" class="list-item">{{ item }}</span>
    </transition-group>
</div>
<script>
    new Vue({
      el: '#list-demo',
      data: {
        items: [1,2,3,4,5,6,7,8,9],
        nextNum: 10
      },
      methods: {
        randomIndex: function () {
          return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
          this.items.splice(this.randomIndex(), 0, this.nextNum++)  //先操作后自增
        },
        remove: function () {
          this.items.splice(this.randomIndex(), 1)
        },
      }
    });
</script>
```
- 列表的排序过渡
    + `<transition-group>`除了可以进入和离开动画，还可以改变定位，这个功能的实现靠的是 `v-move` 特性，它会在元素的改变定位的过程中应用
    + 可以通过 `name` 属性来自定义前缀，也可以通过 `move-class` 属性手动设置
    + 排序过渡的实现，Vue使用了一个叫 `FLIP` 简单的动画队列使用transform 将元素从之前的位置平滑过渡新的位置。需要注意的是使用 FLIP 过渡的元素不能设置为 `display: inline`。作为替代方案，可以设置为 `display: inline-block` 或者放置于 flex 中
    ```html
    <style>
        .flip-list-move{transition: transform 2s;}
    </style>
    <div id="flip-list-demo" class="demo">
      <button v-on:click="shuffle">Shuffle</button>
      <transition-group name="flip-list" tag="ul">
        <li v-for="item in items" v-bind:key="item">
          {{ item }}
        </li>
      </transition-group>
    </div>
    <script>
        new Vue({
            el: '#flip-list-demo',
            data: {
                items: [0,1,2,3,4,5,6,7,8,9]
            },
            methods: {
                shuffle: function(){
                    this.items = _.shuffle(this.items); //打乱一个数组
                    console.log(this.items);
                }
            }
        });
    </script>
    ```
    ```html
    <!--有进入、离开和排序的例子-->
    <style type="text/css">
        .list-item {
          display: inline-block;
          margin-right: 10px;
          transition: all 1s;
        }
        .list-leave-active {
            position: absolute;
        }
        .list-enter, .list-leave-to
        /* .list-leave-active for below version 2.1.8 */ {
          opacity: 0;
          transform: translateY(30px);
        }
    </style>
    <div id="list-demo" class="demo">
        <button v-on:click="shuffle">Shuffle</button>
        <button v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <transition-group name="list" tag="h4" style="color: red;">
            <!-- key是必须的 -->
            <span v-for="item in items" v-bind:key="item" class="list-item">{{ item }}</span>
        </transition-group>
    </div>
    <script>
        new Vue({
          el: '#list-demo',
          data: {
            items: [1,2,3,4,5,6,7,8,9],
            nextNum: 10
          },
          methods: {
            randomIndex: function () {
              return Math.floor(Math.random() * this.items.length)
            },
            add: function () {
              this.items.splice(this.randomIndex(), 0, this.nextNum++)  //先操作后自增
            },
            remove: function () {
              this.items.splice(this.randomIndex(), 1)
            },
            shuffle: function(){
                this.items = _.shuffle(this.items);
            }
          }
        });
    </script>
    ```
- 列表的交错过渡

    通过 `data` 属性与JavaScript进行通信，就可以实现列表的交错过渡
    ```html
    <div id="staggered-list-demo">
        <input v-model="query">
        <!--transtion里面的所有元素进入或离开都会触发过渡效果-->
        <transition-group
            name="staggered-fade"
            tag="ul"
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
        >
            <li
                v-for="(item, index) in computedList"
                v-bind:key="item.msg"
                v-bind:data-index="index"
            >{{ item.msg }}</li>
        </transition-group>
    </div>
    <script>
        new Vue({
            el: '#staggered-list-demo',
            data: {
                query: '',
                list: [
                    { msg: 'Bruce Lee' },
                    { msg: 'Jackie Chan' },
                    { msg: 'Chuck Norris' },
                    { msg: 'Jet Li' },
                    { msg: 'Kung Fury' }
                ]
            },
            computed: {
                computedList: function(){
                    var vm = this;
                    return this.list.filter(function(item){
                        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
                    });
                }
            },
            methods: {
                beforeEnter: function (el) {
                  el.style.opacity = 0
                  el.style.height = 0
                },
                enter: function (el, done) {
                  var delay = el.dataset.index * 150
                  setTimeout(function () {
                    Velocity(
                      el,
                      { opacity: 1, height: '2em' },
                      { complete: done }
                    )
                  }, delay)
                },
                leave: function (el, done) {
                  var delay = el.dataset.index * 150
                  setTimeout(function () {
                    Velocity(
                      el,
                      { opacity: 0, height: 0 },
                      { complete: done }
                    )
                  }, delay)
                }
            }
        });
    </script>
    ```

## 可复用的过渡
过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，需要做的就是将 `<transition>` 或者 `<transition-group>` 作为根组件，然后将任何子组件放置在其中就可以了。
- 简单示例：
```javascript
Vue.component('my-special-transition', {
  template: '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      v-on:before-enter="beforeEnter"\
      v-on:after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\
  ',
  methods: {
    beforeEnter: function (el) {
      // ...
    },
    afterEnter: function (el) {
      // ...
    }
  }
});
```
- 函数组件实现可复用的过渡：
```javascript
Vue.component('my-special-transition', {
  functional: true,
  render: function (createElement, context) {
    var data = {
        props: {
            name: 'very-special-transition',
            mode: 'out-in'
        },
        on: {
            beforeEnter: function (el) {
             // ...
            },
            afterEnter: function (el) {
                // ...
            }
        }
    }
    return createElement('transition', data, context.children)
    // return createElement('transition-group', data, context.children)
  }
});
```

## 动态过渡
- 基本例子：通过 `name` 特性来绑定动态值
```html
<transition v-bind:name="transitionName">
  <!-- ... -->
</transition>
```
- 可以根据组件的状态通过 JavaScript 过渡设置不同的过渡效果
```html
<div id="dynamic-fade-demo" class="demo">
    Fade In: <input type="range" v-model="fadeInDuration" min="0" v-bind:max="maxFadeDuration">
    Fade Out: <input type="range" v-model="fadeOutDuration" min="0" v-bind:max="maxFadeDuration">
    <transition
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
    >
        <p v-if="show">hello</p>
    </transition>
    <button v-if="stop" v-on:click="stop = false; show = false">Start animating</button>
    <button v-else v-on:click="stop = true">Stop it!</button>
</div>
<script>
    new Vue({
      el: '#dynamic-fade-demo',
      data: {
        show: true,
        fadeInDuration: 1000,
        fadeOutDuration: 1000,
        maxFadeDuration: 5000,
        stop: true
      },
      mounted: function () { //mounted:挂载
        this.show = false
      },
      methods: {
        beforeEnter: function (el) {
          el.style.opacity = 0
        },
        enter: function (el, done) {
          var vm = this;
          Velocity(el,
            { opacity: 1 },
            {
              duration: this.fadeInDuration,
              complete: function () {
                done()
                if (!vm.stop) vm.show = false
              }
            }
          )
        },
        leave: function (el, done) {
          var vm = this;
          Velocity(el,
            { opacity: 0 },
            {
              duration: this.fadeOutDuration,
              complete: function () {
                done()
                vm.show = true
              }
            }
          )
        }
      }
    });
</script>
```
- 创建动态过渡的最终方案是组件通过接受 `props` 来动态修改之前的过渡
