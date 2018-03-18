# 路由
通过 URL 映射到对应页面的功能实现，Vue 的路由使用要先引入 vue-router.js

## 基本路由入门
```html
<div id="app">
    <h1>Hello APP!</h1>
    <p>
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>
```
```javascript
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
// var Vue = require('vue');
// var VueRouter = require('vue-router');
// Vue.use(VueRouter);

// 1. 定义（路由）组件component。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置，还可以传别的配置参数
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例。要通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app');
```

## 动态路由匹配
- 一个『路径参数』使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用：
```html
<div id="app">
    <h1>动态路由匹配</h1>
    <p>
        <router-link to='/user/1'>User1</router-link>
        <router-link to='/user/2'>User2</router-link>
    </p>
    <router-view></router-view>
</div>
```
```javascript
//通过对象 $route.params 来获取参数，输出当前用户的userid
const User = { template: '<div><h2>{{$route.params.userid}}</h2></div>' };

const routes = [
    {path: '/user/:userid', component: User}
]

const router = new VueRouter({
    routes
})

new Vue({
    router
}).$mount('#app');
```
- 可以在一个路由中设置多段『路径参数』，对应的值都会设置到 `$route.params`中。例如：
<table>
<thead>
<tr><th>模式</th>
<th>匹配路径</th>
<th>$route.params</th>
</tr></thead><tbody>
<tr><td>/user/:username</td>
<td>/user/evan</td>
<td><code>{ username: 'evan' }</code></td>
</tr><tr><td>/user/:username/post/:post_id</td>
<td>/user/evan/post/123</td>
<td><code>{ username: 'evan', post_id: 123 }</code></td>
</tr></tbody></table>

- `$router`对象（路由信息对象）
    + 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）
    + route object 是不可变的，每次成功的导航后都会产生一个新的对象
    + route object 出现在多个地方:
        - 在组件内，即 `this.$route`
        - 在 `$route` 观察者回调内
        - `router.match(location)` 的返回值
        - 导航守卫的参数：
        ```javascript
        router.beforeEach((to, from, next) => {
          // to 和 from 都是 路由信息对象
        })
        //scrollBehavior 方法的参数:
        const router = new VueRouter({
          scrollBehavior (to, from, savedPosition) {
            // to 和 from 都是 路由信息对象
          }
        });
        ```
    + 路由信息对象的属性
        - `$route.path`:字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"
        - `$route.params`:一个 key/value 对象，包含了 动态片段 和 全匹配片段，如果没有路由参数，就是一个空对象
        - `$route.query`:一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象
        - `$route.hash`:当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串
        - `$route.fullPath`:完成解析后的 URL，包含查询参数和 hash 的完整路径
        - `$route.matched`:一个数组，包含当前路由的所有嵌套路径片段的 路由记录 。路由记录就是 routes 配置数组中的对象副本（还有在 children 数组）
        ```javascript
        const router = new VueRouter({
          routes: [
            // 下面的对象就是 route record
            { path: '/foo', component: Foo,
              children: [
                // 这也是个 route record
                { path: 'bar', component: Bar }
              ]
            }
          ]
        });
        //当 URL 为 /foo/bar，$route.matched 将会是一个包含从上到下的所有对象（副本）
        ```
        - `$route.name`:当前路由的名称，如果有的话
- 响应路由参数的变化
    + 可以简单地 `watch`（监测变化） `$route` 对象：
    ```javascript
    const User = {
      template: '...',
      watch: {
        '$route' (to, from) {
          // 对路由变化作出响应...
        }
      }
    };
    ```
    + 使用 2.2 中引入的 `beforeRouteUpdate` 守卫：
    ```javascript
    const User = {
      template: '...',
      beforeRouteUpdate (to, from, next) {
        // react to route changes...
        // don't forget to call next()
      }
    };
    ```
- 高级匹配模式

vue-router 使用 path-to-regexp 作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// The matching uses path-to-regexp, which is the matching engine used
// by express as well, so the same matching rules apply.
// For detailed rules, see https://github.com/pillarjs/path-to-regexp
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/' },
    // params are denoted with a colon ":"
    { path: '/params/:foo/:bar' },
    // a param can be made optional by adding "?"
    { path: '/optional-params/:foo?' },
    // a param can be followed by a regex pattern in parens
    // this route will only be matched if :id is all numbers
    { path: '/params-with-regex/:id(\\d+)' },
    // asterisk can match anything
    { path: '/asterisk/*' },
    // make part of th path optional by wrapping with parens and add "?"
    { path: '/optional-group/(foo/)?bar' }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route Matching</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/params/foo/bar">/params/foo/bar</router-link></li>
        <li><router-link to="/optional-params">/optional-params</router-link></li>
        <li><router-link to="/optional-params/foo">/optional-params/foo</router-link></li>
        <li><router-link to="/params-with-regex/123">/params-with-regex/123</router-link></li>
        <li><router-link to="/params-with-regex/abc">/params-with-regex/abc</router-link></li>
        <li><router-link to="/asterisk/foo">/asterisk/foo</router-link></li>
        <li><router-link to="/asterisk/foo/bar">/asterisk/foo/bar</router-link></li>
        <li><router-link to="/optional-group/bar">/optional-group/bar</router-link></li>
        <li><router-link to="/optional-group/foo/bar">/optional-group/foo/bar</router-link></li>
      </ul>
      <p>Route context</p>
      <pre>{{ JSON.stringify($route, null, 2) }}</pre>
    </div>
  `
}).$mount('#app');
```
- 匹配优先级

同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

## 嵌套路由
```html
<div id="app">
  <p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/foo/profile">/user/foo/profile</router-link>
    <router-link to="/user/foo/posts">/user/foo/posts</router-link>
  </p>
  <router-view></router-view>
</div>
```
```javascript
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,       //以 / 开头的嵌套路径会被当作根路径
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        // 空的 子路由
        { path: '', component: UserHome },

        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        // profile 会被渲染在 User 的 <router-view> 中
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app');
```
## 编程式导航
### 除了使用 `<router-link>` 创建 `a` 标签来定义导航链接，还可以借助 `router` 的实例方法，通过编写代码来实现。
- 想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 `history` 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。`router.push(location, onComplete?, onAbort?);`
    - 在 Vue 实例内部，可以通过 $router 访问路由实例。因此可以调用 `this.$router.push`
    - <table>
        <thead>
        <tr><th>声明式</th>
        <th>编程式</th>
        </tr></thead><tbody>
        <tr><td><code>&lt;router-link :to="..."&gt;</code></td>
        <td><code>router.push(...)</code></td>
        </tr></tbody></table>
    - 该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
    ```javascript
    // 字符串
    router.push('home')

    // 对象
    router.push({ path: 'home' })

    // 命名的路由
    router.push({ name: 'user', params: { userId: 123 }})   // -> /user/123
    router.push({ path: `/user/${userId: 123}` }) // -> /user/123

    // 带查询参数，变成 /register?plan=private
    router.push({ path: 'register', query: { plan: 'private' }});
    ```
    - 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，需要使用 `beforeRouteUpdate` 来响应这个变化 (比如抓取用户信息

- `router.replace(location, onComplete?, onAbort?)`
    - 跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录
    - <table>
    <thead>
    <tr><th>声明式</th>
    <th>编程式</th>
    </tr></thead><tbody>
    <tr><td><code>&lt;router-link :to="..." replace&gt;</code></td>
    <td><code>router.replace(...)</code></td>
    </tr></tbody></table>

- `router.go(n)`:这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`
```javascript
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

- `vue-router` 的导航方法 （`push`、 `replace`、 `go`） 在各类路由模式（`history`、 `hash` 和 `abstract`）下表现一致
- 用JavaScript跳转路由示例：
```htmls
<div id="app">
    <h1>Hello VueRouter</h1>
    <p>
        <!--用 `router-link` 组件进行跳转-->
        <router-link to="/floor1">一楼</router-link>
        <!--编程式导航1：router.replace-->
        <input type="button" value="一楼" @click="router.replace('/floor1')">
        <!--编程式导航2：router.push()-->
        <input type="button" value="一楼" @click="router.push('/floor1')">
        <!--编程式导航3：router.push({})-->
        <input type="button" value="一楼" @click="router.push({path: '/floor1'})">
    </p>
    <router-view></router-view>
</div>
```

## 命名路由
在路由映射表中添加属性 `name`，用以对该路由映射规则命名，在编程式导航跳转路由时可以用 `router.push({name: '名称'})`
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<div>This is Home</div>' }
const Foo = { template: '<div>This is Foo</div>' }
const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Named Routes</h1>
      <p>Current route name: {{ $route.name }}</p>
      <ul>
        <li><router-link :to="{ name: 'home' }">home</router-link></li>
        <li><router-link :to="{ name: 'foo' }">foo</router-link></li>
        <li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
```

## 命名视图
当同时（同级）想展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view`没有设置名字，那么默认为 `default`。
```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
- 命名视图简单示例：
```html
<div id="app">
    <h1>Named Views</h1>
    <ul>
        <li>
            <router-link to="/">/</router-link>
        </li>
        <li>
            <router-link to="/other">/other</router-link>
        </li>
    </ul>
    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>
</div>
```
```javascript
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
})

new Vue({
    router,
  el: '#app'
});
```
- 嵌套命名视图
```html
<div id="app">
  <h1>Nested Named Views</h1>
  <router-view></router-view>
</div>
```
```javascript
const UserSettingsNav = {
    template: `
        <div class="us__nav">
          <router-link to="/settings/emails">emails</router-link>
          <br>
          <router-link to="/settings/profile">profile</router-link>
        </div>
    `
}
const UserSettings = {
    template: `
        <div class="us">
          <h2>User Settings</h2>
          <UserSettingsNav/>
          <router-view class ="us__content"/>
          <router-view name="helper" class="us__content us__content--helper"/>
        </div>
    `,
     components: { UserSettingsNav }
}
const UserEmailsSubscriptions = {
    template: `
        <div>
            <h3>Email Subscriptions</h3>
        </div>
    `
}
const UserProfile = {
    template: `
        <div>
            <h3>Edit your profile</h3>
        </div>
    `
}
const UserProfilePreview = {
    template: `
        <div>
            <h3>Preview of your profile</h3>
        </div>
    `
}

const router = new VueRouter({
  mode: 'history',  //配置路由模式，依赖 HTML5 History API 和服务器配置
  routes: [
    { path: '/settings',
      // You could also have named views at tho top
      component: UserSettings,
      children: [{
        path: 'emails',
        component: UserEmailsSubscriptions
      }, {
        path: 'profile',
        components: {
            default: UserProfile,
            helper: UserProfilePreview
        }
      }]
    }
  ]
})

router.push('/settings/emails')

new Vue({
    router,
  el: '#app'
});
```

## 重定向和别名
### 重定向
『重定向』的意思是，当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b

+ 重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b：
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
});
```
+ 重定向的目标也可以是一个命名的路由：
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
});
```
+ 甚至是一个方法，动态返回重定向目标：
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
});
```

### 别名
别名指的是：/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
});
```
『别名』的功能可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构

## 向路由组件传递props
