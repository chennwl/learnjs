# 进入/离开 & 列表过渡
## 过渡效果
SPA 中组件的切换有一种生硬的隐藏显示感觉，为了更好的用户体验，让组件切换时淡出淡入，Vue 提供了专门的组件 `transition`。可以使用下列的工具来实现过渡效果：
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
    + `v-enter`:定义进入过渡的开始状态。在元素被插入时生效
    + `v-enter-active`:定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 `transition/animation` 完成之后移除
    + `v-enter-to`:2.1.8版及以上定义进入过渡的结束状态。在元素被插入一帧时生效（与此同时 `v-enter` 被移除），在 `transition/animation` 完成之后移除。即会跟 `v-enter-active`同时移除
    + `v-leave`:定义离开过渡的开始状态。在离开过渡被触发时生效
    + `v-leave-active`:定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 `transition/animation` 完成之后移除
    + `v-leave-to`:2.1.8版及以上定义离开过渡的结束状态。在离开过渡被触发一帧后生效 (与此同时 `v-leave` 被删除)，在 `transition/animation` 完成之后移除。即会跟 `v-leave-active`同时移除

每个状态在使用的时候都是在 CSS 中使用，v- 是这些类名的前缀。使用 `<transition name="my-transition">` 可以重置前缀，比如 `v-enter` 替换为 `my-transition-enter`。

- CSS过渡
