# Vuex
Vuex 是一个专为 Vue.js 应用程序开发的 **状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 基础
- 每一个 Vuex 应用的核心就是 `store`（仓库）。“store”基本上就是一个容器，它包含着应用中大部分的 **状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：
    1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
    2. 不能直接改变 `store` 中的状态。改变 `store` 中的状态的唯一途径就是显式地 **提交 (commit) `mutation`**。这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助我们更好地了解应用。
- 在vuex中数据是单一流向的：视图(view)触发action，action提交(commit)到mutations，mutations改变state(数据)，state的改变，相应的组件也会相应的更新
- 简单示例：
```javascript
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state){
            state.count++;      //通过提交 mutation 的方式去改变state
        }
    }
});

// store.commit 方法触发状态变更
store.commit('increment');
//通过 store.state 来获取状态对象
console.log(store.state.count) // => 1
```

## 核心概念
- State
    + 单一状态树，唯一数据源，能够直接清晰的读懂数据的结构
    + 在 Vue 组件中获得 Vuex 状态
        - Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中
        - 子组件能通过 `this.$store` 访问到
        ```html
        <div id="app"></div>
        ```
        ```javascript
        const store = new Vuex.Store({
            state: {
                count: 2
            },
            mutations: {
                increment(state){
                    state.count++;
                }
            }
        });

        const Counter = {
            template: `<div>{{ count }}</div>`,
            computed: {
                count() {
                    //且子组件能通过 this.$store 访问到
                    return this.$store.state.count
                }
            }
        }

        const app = new Vue({
            el: '#app',
            // 在根实例中注册 store 选项，把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
            store,
            components: { Counter },
            template: `
                <div class="app">
                    <counter></counter>
                </div>
                `
        });

        store.commit('increment');
        ```
        渲染结果:
        ```html
        <div class="app"><div>3</div></div>
        ```
    + mapState 辅助函数
        - 当一个组件需要获取多个状态时候，可以使用 `mapState` 辅助函数生成计算属性：
        ```javascript
        // 在单独构建的版本中辅助函数为 Vuex.mapState
        import { mapState } from 'vuex'

        export default {
          // ...
          computed: mapState({
            // 箭头函数可使代码更简练
            count: state => state.count,

            // 传字符串参数 'count' 等同于 `state => state.count`
            count: 'count',

            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            countPlusLocalState (state) {
              return state.count + this.localCount
            }
          });
        }
        ```
        - 当映射的计算属性的名称与 `state` 的子节点名称相同时，也可以给 mapState 传一个字符串数组：
        ```javascript
        computed: mapState([
          // 映射 this.count 为 store.state.count
          'count'
        ]);
        ```
    - 对象展开运算符
    - 组件仍然保有局部状态
- Getter
    + Vuex 可以在 `store` 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
    ```html
    <div id="app">
        <p v-for="item in doneTodos">{{ item.text + doneTodosCount }}</p>
    </div>
    ```
    ```javascript
    const store = new Vuex.Store({
        state: {
            todos: [
                { id: 1, text: '文本one', done: true },
                { id: 2, text: '文本two', done: false }
            ]
        },
        getters: {
            // 这里第一个参数为 state
            doneTodos: state => {
                return state.todos.filter(todo => todo.done);
            },
            // 接受其他 getter 作为第二个参数
            doneTodosCount: (state, getters) => {
                return getters.doneTodos.length
            },
            // 通过让 getter 返回一个函数，来实现给 getter 传参。对 store 里的数组进行查询时非常有用
            getTodoById: (state) => (id) => {   //多重箭头
                return state.todos.find(todo => todo.id === id);
            }
            /**
            function(state){
                return function(id){
                    return state.todos.find(function(todo){
                        return todo.id === id
                    });
                }
            }
            */
        }
    });

    console.log(store.getters.doneTodos);   // => [{ id: 1, text: '文本one', done: true }]

    console.log(store.getters.doneTodosCount); // => 1

    console.log(store.getters.getTodoById(2));  // => { id: 2, text: '文本two', done: false }

    var vm = new Vue({
        el: '#app',
        store,
        computed: {
            doneTodos () {
                return this.$store.getters.doneTodos
            },
            doneTodosCount () {
                return this.$store.getters.doneTodosCount       //在组件中使用getters
            }
        }
    });
    ```
    编译结果：
    ```html
    <div id="app"><p>文本one1</p></div>
    ```
    + mapGetters 辅助函数
- Mutation

- Action

- Module



