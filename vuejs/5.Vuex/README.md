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
          ...mapGetters([
              'doneTodosCount',
              'anotherGetter',
              // ...
            ])
          }
        }
        ```
        - 将一个 getter 属性另取一个名字，使用对象形式：
        ```javascript
        ...mapGetters({
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
            - 以新对象替换老对象。例如，利用对象展开运算符可以这样写：`state.obj = { ...state.obj, newProp: 123 }`
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
    + 在组件中分发(dispatch) Action（都需要在根节点注入 `store`）
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
        - `store.dispatch` 可以处理被触发的 `action` 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：
        ```javascript
        actions: {
          actionA ({ commit }) {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                commit('someMutation')
                resolve()
              }, 1000)
            })
          }
        }
        // 可以这样
        store.dispatch('actionA').then(() => {
          // ...
        });

        // 在另外一个action中还可以
        actions: {
          actionB ({ dispatch, commit }) {
            return dispatch('actionA').then(() => {
              commit('someOtherMutation')
            })
          }
        }
        ```
        - 利用 `async` / `await`，可以如下组合 `action`：
        ```javascript
        // 假设 getData() 和 getOtherData() 返回的是 Promise

        actions: {
          async actionA ({ commit }) {
            commit('gotData', await getData())
          },
          async actionB ({ dispatch, commit }) {
            await dispatch('actionA') // 等待 actionA 完成
            commit('gotOtherData', await getOtherData())
          }
        }
        // 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行
        ```
- Module
    + Vuex 允许我们将 `store` 分割成模块（`module`）。每个模块拥有自己的 `state`、`mutation`、`action`、`getter`、甚至是嵌套子模块——从上至下进行同样方式的分割：
    ```javascript
    const moduleA = {
      state: { ... },
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }

    const moduleB = {
      state: { ... },
      mutations: { ... },
      actions: { ... }
    }

    const store = new Vuex.Store({
      modules: {
        a: moduleA,
        b: moduleB
      }
    });

    store.state.a; // -> moduleA 的状态
    store.state.b; // -> moduleB 的状态
    ```
    + 模块的局部状态
        - 模块内部的 `mutation` 和 `getter`，接收的第一个参数是 **模块的局部状态对象**
        - 模块内部的 `action`，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`
        - 模块内部的 `getter`，根节点状态会作为第三个参数暴露出来
        ```javascript
        const moduleA = {
          state: { count: 0 },
          mutations: {
            increment (state) {
              // 这里的 `state` 对象是模块的局部状态
              state.count++
            },
            incrementIfOddOnRootSum ({ state, commit, rootState }) { //根节点作为第三个参数
              if ((state.count + rootState.count) % 2 === 1) {
                commit('increment')     // context.state 模块内部局部状态
              }
            }
          },
          getters: {
            doubleCount (state) {
              return state.count * 2
            },
            sumWithRootCount (state, getters, rootState) { //根节点作为第三个参数
              return state.count + rootState.count
            }
          }
        };
        ```
    + 命名空间
        - 默认情况下，模块内部的 `action`、`mutation` 和 `getter` 是注册在 **全局命名空间** 的——这样使得多个模块能够对同一 `mutation` 或 `action` 作出响应
        - 通过添加 `namespaced: true` 的方式可以让模块成为命名空间模块，使其具有更高的封装度和复用性
        - 当模块被注册后，它的所有 `getter`、`action` 及 `mutation`都会自动根据模块注册的路径调整命名
        ```javascript
        const store = new Vuex.Store({
          modules: {
            account: {
              namespaced: true,
              // 模块内容（module assets）
              state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
              getters: {
                isAdmin () { ... } // -> getters['account/isAdmin']
              },
              actions: {
                login () { ... } // -> dispatch('account/login')
              },
              mutations: {
                login () { ... } // -> commit('account/login')
              },
              // 嵌套模块
              modules: {
                // 继承父模块的命名空间
                myPage: {
                  state: { ... },
                  getters: {
                    profile () { ... } // -> getters['account/profile']
                  }
                },
                // 进一步嵌套命名空间
                posts: {
                  namespaced: true,

                  state: { ... },
                  getters: {
                    popular () { ... } // -> getters['account/posts/popular']
                  }
                }
              }
            }
          }
        });
        ```
    + 在命名空间模块内访问全局内容（Global Assets）
        - 如果希望使用全局 `state` 和 `getter`，`rootState` 和 `rootGetter` 会作为第三和第四参数传入 `getter`，也会通过 `context` 对象的属性传入 `action`
        - 若需要在全局命名空间内分发 `action` 或提交 `mutation`，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可
        ```javascript
        modules: {
          foo: {
            namespaced: true,

            getters: {
              // 在这个模块的 getter 中，`getters` 被局部化了
              // 可以使用 getter 的第四个参数来调用 `rootGetters`
              someGetter (state, getters, rootState, rootGetters) {
                getters.someOtherGetter // -> 'foo/someOtherGetter'
                rootGetters.someOtherGetter // -> 'someOtherGetter'
              },
              someOtherGetter: state => { ... }
            },

            actions: {
              // 在这个模块中， dispatch 和 commit 也被局部化了
              // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
              someAction ({ dispatch, commit, getters, rootGetters }) {
                getters.someGetter // -> 'foo/someGetter'
                rootGetters.someGetter // -> 'someGetter'

                dispatch('someOtherAction') // -> 'foo/someOtherAction'
                dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

                commit('someMutation') // -> 'foo/someMutation'
                commit('someMutation', null, { root: true }) // -> 'someMutation'
              },
              someOtherAction (ctx, payload) { ... }
            }
          }
        }
        ```
    + 带命名空间的绑定函数
        - 当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定命名空间模块时，可以将模块的空间名称字符串作为第一个参数传递给函数，这样所有绑定都会自动将该模块作为上下文
        ```javascript
        computed: {
          ...mapState('some/nested/module', {
            a: state => state.a,
            b: state => state.b
          })
        },
        methods: {
          ...mapActions('some/nested/module', [
            'foo',
            'bar'
          ])
        }
        ```
        - 而且可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
        ```javascript
        import { createNamespacedHelpers } from 'vuex'

        const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

        export default {
          computed: {
            // 在 `some/nested/module` 中查找
            ...mapState({
              a: state => state.a,
              b: state => state.b
            })
          },
          methods: {
            // 在 `some/nested/module` 中查找
            ...mapActions([
              'foo',
              'bar'
            ])
          }
        }
        ```
    + 开发插件的注意事项
    
    如果开发的插件（Plugin）提供了模块并允许用户将其添加到 `Vuex store`，可能需要考虑模块的空间名称问题。对于这种情况，可以通过插件的参数对象来允许用户指定空间名称：
    ```javascript
    // 通过插件的参数对象得到空间名称
    // 然后返回 Vuex 插件函数
    export function createPlugin (options = {}) {
      return function (store) {
        // 把空间名字添加到插件模块的类型（type）中去
        const namespace = options.namespace || ''
        store.dispatch(namespace + 'pluginAction')
      }
    }
    ```
    + 模块动态注册
        - 在 `store` 创建之后，可以使用 `store.registerModule` 方法注册模块：
        ```javascript
        // 注册模块 `myModule`
        store.registerModule('myModule', {
          // ...
        })
        // 注册嵌套模块 `nested/myModule`
        store.registerModule(['nested', 'myModule'], {
          // ...
        });
        //之后可以通过 store.state.myModule 和 store.state.nested.myModule 访问模块的状态
        ```
        - 可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，不能使用此方法卸载静态模块（即创建 `store` 时声明的模块）
        - 在注册一个新 `module` 时，如果想保留过去的 `state`，例如从一个服务端渲染的应用保留 `state`。可以通过 `preserveState` 选项将其归档：`store.registerModule('a', module, { preserveState: true })`
    + 模块重用

    使用一个函数来声明模块状态（仅2.3.0+支持）避免模块间数据互相污染的问题：
    ```javascript
    const MyReusableModule = {
      state () {
        return {
          foo: 'bar'
        }
      },
      // mutation, action 和 getter 等等...
    };
    ```

## 项目结构
Vuex规定了一些需要遵守的规则：
1. 应用层级的状态应该集中到单个 `store` 对象中。
2. 提交 `mutation` 是更改状态的唯一方法，并且这个过程是同步的。
3. 异步逻辑都应该封装到 `action` 里面。

## 插件
- 定义和使用插件：
    + Vuex 插件就是一个函数，它接收 `store` 作为唯一参数：
    ```javascript
    const myPlugin = store => {
      // 当 store 初始化后调用
      store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
      })
    };
    ```
    + Vuex 的 `store` 接受 `plugins` 选项，这个选项暴露出每次 `mutation` 的钩子
    ```javascript
    const store = new Vuex.Store({
      // ...
      plugins: [myPlugin]
    });
    ```
- 在插件内提交 Mutation

通过提交 `mutation`，插件可以用来同步数据源到 `store`
```javascript
// 同步 websocket 数据源到 store(大概例子)
export default function createWebSocketPlugin (socket) {
  return store => {
    socket.on('data', data => {
      store.commit('receiveData', data)
    })
    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}
const plugin = createWebSocketPlugin(socket)

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [plugin]
});
```
- 生成 State 快照

- 内置 Logger 插件

## 严格模式
- 在严格模式下，无论何时发生了状态变更且不是由 `mutation` 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到
- 开启严格模式，仅需在创建 `store` 的时候传入 `strict: true`：
```javascript
const store = new Vuex.Store({
  // ...
  strict: true
});
```
- **不要在发布环境下启用严格模！** 严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失
```javascript
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
});
```

## 表单处理
- 当在严格模式中使用 Vuex 时，用“Vuex 的思维”在属于 Vuex 的 `state` 上使用 `v-model`：
```html
<div id="app">
    <input :value="message" @input="updateMessage" />
    <p>{{ message }}</p>
</div>
```
```javascript
var store = new Vuex.Store({
    strict: true,
    state: {
        obj: {
            message: 20
        }
    },
    //mutation函数
    mutations: {
      updateMessage (state, message) {
        state.obj.message = message
      }
    }
});

new Vue({
    el: '#app',
    store,
    computed:
   // {
   //     message(){
   //         return this.$store.state.obj.message
   //     }
   // },
    Vuex.mapState({
        message: state => state.obj.message
    }),
    methods: {
      updateMessage (e) {
        this.$store.commit('updateMessage', e.target.value)
      }
    }
});
```
- 使用带有 `setter` 的双向绑定计算属性：
```html
<input v-model="message" />
```
```javascript
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

## 测试

## 热重载(热替换新的 `action` 和 `mutation`)
- 使用 webpack 的 Hot Module Replacement API，Vuex 支持在开发过程中热重载 `mutation`、`module`、`action` 和 `getter`。也可以在 Browserify 中使用 browserify-hmr 插件
- 对于 `mutation` 和模块，需要使用 `store.hotUpdate()` 方法：
```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import moduleA from './modules/a'

Vue.use(Vuex)

const state = { ... }

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    a: moduleA
  }
})

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./mutations', './modules/a'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newMutations = require('./mutations').default
    const newModuleA = require('./modules/a').default
    // 加载新模块
    store.hotUpdate({
      mutations: newMutations,
      modules: {
        a: newModuleA
      }
    })
  })
}
```



