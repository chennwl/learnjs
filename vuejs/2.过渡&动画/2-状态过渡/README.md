# 状态过渡
- 状态过渡指的是数据元素本身的动效：
    + 数字和运算
    + 颜色的显示
    + SVG节点的位置
    + 元素的大小和其他的属性

- 状态动画和侦听器
    + 监听数值属性的数值更新
    ```html
    <div id="animated-number-demo">
        <!-- 自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符 -->
        <input type="number" v-model.number="number" step="20" name="" />
        <p>{{ animatedNumber }}</p>
    </div>
    <script>
        new Vue({
            el: '#animated-number-demo',
            data: {
                number: 0,
                tweenedNumber: 0
            },
            computed: {
                animatedNumber: function(){
                    return this.tweenedNumber.toFixed(0); //当tweenedNumber值变化时就会触发animatedNumber值改变
                }
            },
            watch: {
                /*
                * number改变就会触发监听
                 */
                number: function(newValue){
                    TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue }); //将tweenedNumber变为input框上的值
                }
            }
        });
    </script>
    ```
    + 监听color值的更新
    ```html
    <style>
        .example-1-color-preview {
            display: inline-block;
            width: 50px;
            height: 50px;
        }
    </style>
    <div id="example-1">
        <input
            v-model="colorQuery"
            v-on:keyup.enter="updateColor"
            placeholder="Enter a color"
        >
        <button v-on:click="updateColor">Update</button>
        <p>Preview:</p>
        <span
            v-bind:style="{ backgroundColor: tweenedCSSColor }"
            class="example-1-color-preview"
        ></span>
        <p>{{ tweenedCSSColor }}</p>
    </div>
    <script>
        var Color = net.brehaut.Color;
        new Vue({
            el: '#example-1',
            data: {
                colorQuery: '',
                color: {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 1
                },
                tweenedColor: {}
            },
            created: function () {
                this.tweenedColor = Object.assign({}, this.color)
            },
            watch: {
                color: function () {
                    function animate () {
                        if (TWEEN.update()) {
                            requestAnimationFrame(animate)
                        }
                    }

                    new TWEEN.Tween(this.tweenedColor)
                        .to(this.color, 750)
                        .start()

                    animate()
                }
            },
            computed: {
                tweenedCSSColor: function () {
                    return new Color({
                        red: this.tweenedColor.red,
                        green: this.tweenedColor.green,
                        blue: this.tweenedColor.blue,
                        alpha: this.tweenedColor.alpha
                    }).toCSS();
                }
            },
            methods: {
                updateColor: function () {
                    this.color = new Color(this.colorQuery).toRGB()
                    this.colorQuery = ''
                }
            }
        });
    </script>
    ```

- 动态状态过渡

    跟 Vue 的过渡组件一样，数据背后状态过渡会实时更新
- 将过渡放在组件里

    管理太多的状态过渡会很快的增加 Vue 实例或者组件的复杂性，很多的动画都可以提取到专用的子组件
    ```html
    <div id="example-8" class="demo">
        <input v-model.number="firstNumber" type="number" step="20"> +
        <input v-model.number="secondNumber" type="number" step="20"> =
        {{ result }}
        <p>
            <animated-integer v-bind:value="firstNumber"></animated-integer> +
            <animated-integer v-bind:value="secondNumber"></animated-integer> =
            <animated-integer v-bind:value="result"></animated-integer>
        </p>
    </div>
    <script>
        // 这种复杂的补间动画逻辑可以被复用
        // 任何整数都可以执行动画
        // 组件化使界面十分清晰
        // 可以支持更多更复杂的动态过渡策略。
        Vue.component('animated-integer', {
          template: '<span>{{ tweeningValue }}</span>',
          props: {
            value: {
              type: Number,
              required: true
            }
          },
          data: function () {
            return {
              tweeningValue: 0
            }
          },
          watch: {
            value: function (newValue, oldValue) {
              this.tween(oldValue, newValue)
            }
          },
          mounted: function () {
            this.tween(0, this.value)
          },
          methods: {
            tween: function (startValue, endValue) {
              var vm = this
              function animate () {
                if (TWEEN.update()) {
                  requestAnimationFrame(animate)
                }
              }

              new TWEEN.Tween({ tweeningValue: startValue })
                .to({ tweeningValue: endValue }, 500)
                .onUpdate(function () {
                  vm.tweeningValue = this.tweeningValue.toFixed(0)
                })
                .start()

              animate()
            }
          }
        })
        new Vue({
          el: '#example-8',
          data: {
            firstNumber: 20,
            secondNumber: 40
          },
          computed: {
            result: function () {
              return this.firstNumber + this.secondNumber
            }
          }
        });
    </script>
    ```