# 进入/离开 & 列表过渡
## 过渡效果
SPA 中组件的切换有一种生硬的隐藏显示感觉，为了更好的用户体验，让组件切换时淡出淡入，Vue 提供了专门的组件 `transition`。可以使用下列的工具来实现过渡效果：
- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

## 单元素/组建的过渡
