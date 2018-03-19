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
        - mapGetters 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性：
        ```javascript
        import { mapGetters } from 'vuex'   //Vuex.mapGetters

        export default {
          // ...
          computed: {
          // 使用对象展开运算符将 getter 混入 computed 对象中
            mapGetters([
              'doneTodosCount',
              'anotherGetter',
              // ...
            ])
          }
        }
        ```
        - 将一个 getter 属性另取一个名字，使用对象形式：
        ```javascript
        mapGetters({
          // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
          doneCount: 'doneTodosCount'
        });
        ```
- Mutation
    + 更改 Vuex 的 `store` 中的状态的唯一方法是提交 `mutation`。每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行数据更改的地方，并且它会接受 state 作为第一个参数
    ```javascript
    const store = new Vuex.Store({
      state: {
        count: 1
      },
      mutations: {
        //increment为事件类型，回调函数为(state){}
        increment (state) {
          // 变更状态
          state.count++
        }
      }
    });

    store.commit('increment');  //更改 store 中的状态
    ```
    + 提交载荷（Payload）：可以向 `store.commit` 传入额外的参数，即 `mutation` 的 载荷（payload）
    ```html
    <div id="app">{{ count }}</div>     <!-- 22 -->
    ```
    ```javascript
    const store = new Vuex.Store({
        state: {
            count: 2
        },
        mutations: {
            increment (state, payload){
                state.count += payload.amount
            }
        }
    });

    new Vue({
        el: '#app',
        store,
        computed:
        // {
            // count(){
            //  return this.$store.state.count
            // }
        // }

        // mapState
        Vuex.mapState([
            'count'
        ])
    });

    // 提交载荷
    store.commit('increment', {
        amount: 20
    });
    ```
    + 对象风格的提交方式
    ```javascript
    //包含type属性的对象提交mutation
    store.commit({
      type: 'increment',
      amount: 10
    });
    //当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变
    ```
    + Mutation 需遵守 Vue 的响应规则
        1. 最好提前在 `store` 中初始化好所有所需属性。
        2. 当需要在对象上添加新属性时，应该
            - 使用 `Vue.set(obj, 'newProp', 123)`, 或者
            - 以新对象替换老对象。例如，利用 stage-3 的对象展开运算符可以这样写：`state.obj = { ...state.obj, newProp: 123 }`
    + 使用常量替代 Mutation 事件类型
    ```javascript
    // mutation-types.js
    export const SOME_MUTATION = 'SOME_MUTATION'
    // store.js
    import Vuex from 'vuex'
    import { SOME_MUTATION } from './mutation-types'

    const store = new Vuex.Store({
      state: { ... },
      mutations: {
        // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
        [SOME_MUTATION] (state) {
          // mutate state
        }
      }
    });
    ```
    + Mutation 必须是同步函数
    + 在组件中提交 Mutation（都需要在根节点注入 `store`）
        - 可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation
        - 使用 `mapMutations` 辅助函数将组件中的 `methods` 映射为 `store.commit` 调用
        ```javascript
        import { mapMutations } from 'vuex'

        export default {
          // ...
          methods: {
            ...mapMutations([
              'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

              // `mapMutations` 也支持载荷：
              'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
            ]),
            ...mapMutations({
              add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
            })
          }
        }
        ```
- Action
    + Action 类似于 mutation，不同在于：
        - Action 提交的是 mutation，而不是直接变更状态。
        - Action 可以包含任意异步操作
        ```javascript
        const store = new Vuex.Store({
          state: {
            count: 0
          },
          mutations: {
            increment (state) {
              state.count++
            }
          },
          actions: {
            increment (context) {   //context对象具有与store实例相同的方法和属性
              context.commit('increment')
            }
          }
        });
        ```
    + 分发 Action
        - Action 通过 `store.dispatch` 方法触发：`store.dispatch('increment')`
        ```javascript
        //可以在 action 内部执行异步操作
        actions: {
          incrementAsync ({ commit }) { // ES6的参数解构来简化代码
            setTimeout(() => {
              commit('increment')
            }, 1000)
          }
        }
        ```
        - 支持同样的载荷方式和对象方式进行分发：
        ```javascript
        // 以载荷形式分发
        store.dispatch('incrementAsync', {
          amount: 10
        });

        // 以对象形式分发
        store.dispatch({
          type: 'incrementAsync',
          amount: 10
        });
        ```
        - 实际的购物车示例：
        ```javascript
        //进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）
        actions: {
          //在这里state是store.state,products为mutations当中回调函数的参数
          checkout ({ commit, state }, products) {
            // 把当前购物车的物品备份起来
            const savedCartItems = [...state.cart.added]
            // 发出结账请求，然后乐观地清空购物车
            commit(types.CHECKOUT_REQUEST)
            // 购物 API 接受一个成功回调和一个失败回调
            shop.buyProducts(
              products,
              // 成功操作
              () => commit(types.CHECKOUT_SUCCESS),
              // 失败操作
              () => commit(types.CHECKOUT_FAILURE, savedCartItems)
            )
          }
        }
        ```
    + 在组件中分发 Action（都需要在根节点注入 `store`）
        - 在组件中使用 `this.$store.dispatch('xxx')` 分发 action
        - 使用 `mapActions` 辅助函数将组件的 `methods` 映射为 `store.dispatch` 调用
        ```javascript
        import { mapActions } from 'vuex'

        export default {
          // ...
          methods: {
            ...mapActions([
              'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

              // `mapActions` 也支持载荷：
              'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
            ]),
            ...mapActions({
              add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
            })
          }
        }
        ```
    + 组合 Action
- Module



