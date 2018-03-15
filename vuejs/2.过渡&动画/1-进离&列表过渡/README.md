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
      // 进入中
      beforeEnter: function (el) {
        // ...
      },
      // done回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter: function (el, done) {
        // ...
        done()
      },
      afterEnter: function (el) {
        // ...
      },
      enterCancelled: function (el) {
        // ...
      },

      // 离开时
      beforeLeave: function (el) {
        // ...
      },
      // done回调函数是可选项的设置
      // 与 CSS 结合时使用
      leave: function (el, done) {
        // ...
        done()
      },
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
