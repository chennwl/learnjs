# scss、sass
1. CSS预处理器
    - 定义了一种新的专门的编程语言，编译后成正常的CSS文件。为CSS增加一些编程的特性，无需考虑浏览器的兼容问题，让CSS更加简洁，适应性更强，可读性更佳，更易于代码的维护等诸多好处。
    - CSS预处理器语言：`scss（sass）`、`LESS`等；
2. Sass和SCSS的区别
    - 文件扩展名不同：`“.sass”`和`“.scss”`；
    - Sass是以严格缩进式语法规则来书写的，不带大括号和分号；而SCSS的语法和CSS书写语法类似。
```scss
/*主要依靠代码缩进来指定块*/
#sidebar
  width: 30%
  background-color: #faa
```
```scss
/*SCSS语法 需要使用分号和花括号而不是换行和缩进*/
#sidebar {
  width: 30%;
  background-color: #faa;
}
```
3. Sass编译
    - 命令编译
        - 单文件编译
        ```scss
        sass <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css
        ```
        - 多文件编译
        ```scss
        /*表示将项目中“sass”文件夹中所有“.scss”(“.sass”)文件编译成“.css”文件，并且将这些 CSS 文件都放在项目中“css”文件夹中。*/
        sass sass/:css/
        ```
        - 监听编译
        ```scss
        sass --watch <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css
        ```
    - GUI工具编译 
    - 自动化编译(gulp)
4. Sass输出方式
    - 嵌套输出方式nested
    ```scss
    sass --watch test.scss:test.css --style nested
    ```
    - 展开输出方式expanded
    ```scss
    sass --watch test.scss:test.css --style expanded
    ```
    - 展开输出方式compact
    ```scss
    sass --watch test.scss:test.css --style compact
    ```
    - 展开输出方式compressed
    ```scss
    sass --watch test.scss:test.css --style compressed
    ```
5. Sass变量声明：`$+变量名+：+变量值；($width:200px;)`
6. 普通变量、默认变量、多值变量、特殊变量
    - 普通变量声明后可以在全局范围内使用；
    - 默认变量仅需在值后面加上`!default`即可；
    - 默认变量一般是用来设置默认值，然后根据需求来覆盖的，覆盖的方式是在默认变量之前重新声明下变量即可。默认变量的价值在进行组件化开发的时候会非常有用
    ```scss
    //sass style
    $baseLineHeight:        2;
    $baseLineHeight:        1.5 !default;
    body{
        line-height: $baseLineHeight; 
    }

    //css style
    body{
        line-height:2;
    }
    ```
    - 特殊变量：变量作为属性或在某些特殊情况下等则必须要以 `#{$variables}`形式使用
    ```scss
    //sass style
    $borderDirection:       top !default; 
    $baseFontSize:          12px !default;
    $baseLineHeight:        1.5 !default;
    //应用于class和属性
    .border-#{$borderDirection}{
        border-#{$borderDirection}:1px solid #ccc;
    }
    //应用于复杂的属性值
    body{
        font:#{$baseFontSize}/#{$baseLineHeight};
    }

    //css style
    .border-top{
        border-top:1px solid #ccc;
    }
    body {
        font: 12px/1.5;
    }
    ```
    - 多值变量分为`list`类型和`map`类型，简单来说`list`类型有点像js中的数组，而`map`类型有点像js中的对象。
        - `list`数据可通过空格，逗号或小括号分隔多个值，可用`nth($var,$index)`取值。
        ```scss
        //sass style
        $linkColor:         #08c #333 !default;//第一个值为默认值，第二个鼠标滑过值
        a{
            color:nth($linkColor,1);
            &:hover{
                color:nth($linkColor,2);
            }
        }

        //css style
        a{
            color:#08c;
        }
        a:hover{
            color:#333;
        }
        ```
        - `map`数据以`key`和`value`成对出现，其中`value`又可以是`list`。格式为：`$map: (key1: value1, key2: value2, key3: value3);`。可通过`map-get($map,$key)`取值。
        ```scss
        //sass style
        $headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
        @each $header, $size in $headings {
            #{$header} {
                font-size: $size;
            }
        }

        //css style
        h1 {
            font-size: 2em; 
        }
        h2 {
            font-size: 1.5em; 
        }
        h3 {
            font-size: 1.2em; 
        }
        ```
7. 局部变量和全局变量
    - 局部变量：在元素里面声明的变量；
    - 全局变量：在元素外面定义的变量；
    - 全局变量的影子：和全局变量名字相同的局部变量叫做全局变量的影子。
    ```scss
    $color:green;//全局变量
    $width:200px;//全局变量
    $height:200px;//全局变量
    body {
        background-color:$color;//调用全局变量
    }
    div {
        $color:yellow;//定义局部变量，全局变量$color的影子
        .div {
        background-color:$color;//调用局部变量
        width:$width;//调用全局变量
        height:$height;//调用全局变量
        }
    }
    ```
8. sass嵌套
    - 选择器嵌套
    ```scss
    nav {
        a {
            color: red;
            header & {
                color:green;
            }
        }  
    }
    ```
    - 属性嵌套(有相同的属性前缀)
    ```scss
    .box {
        font: {
            size: 12px;
            weight: bold;
        }  
    }
    ```
    - 伪类嵌套
    ```scss
    /*scss*/
    .clearfix{
        &:before,
        &:after {
            content:"";
            display: table;
        }
        &:after {
            clear:both;
            overflow: hidden;
        }
    }
    ```
    ```css
    /*css*/
    clearfix:before, .clearfix:after {
        content: "";
        display: table;
    }
    .clearfix:after {
        clear: both;
        overflow: hidden;
    }
    ```
9. sass混合宏(@mixin)
    - 声明混合宏
    ```scss
    @mixin border-radius { //@mixin:声明混合宏的关键词 border-radius:混合宏的名称
        -webkit-border-radius: 5px;
        border-radius: 5px;
    }
    ```
    - 调用混合宏
    ```scss
    button {
        @include border-radius;
    }//调用混合宏border-radius
    ```
    - 混合宏的参数
        - 不带任何值的参数
        ```scss
        @mixin border-radius($radius){
            -webkit-border-radius: $radius;
            border-radius: $radius;
        }//声明一个带有参数$radius的混合宏
        .box {
            @include border-radius(3px);//调用混合宏并给混合宏传参数“3px”
        }
        ```
        - 传一个带值参数（传入一个默认值）
        ```scss
        @mixin border-radius($radius:3px){
            -webkit-border-radius: $radius;
            border-radius: $radius;
        }//声明一个传入了默认参数值的混合宏
        .btn {
            @include border-radius;//使用默认参数值3px的混合宏
        }
        .box { 
            @include border-radius(50%);//可以自己传入参数值
        }
        ```
        - 传多个参数值
        ```scss
        @mixin size($width,$height){
            width: $width;
            height: $height;
        }
        .box-center {
            @include size(500px,300px);
        }
        ```
10. sass继承
```scss
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}
.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}
```
11. sass占位符`%`：用占位符声明的代码，如果不被`@extend`调用就不会被编译
```scss
%mt5 {
  margin-top: 5px;
}
%pt5{
  padding-top: 5px;
}
.btn {
  @extend %mt5;//使用@extend调用占位符代码
  @extend %pt5;
}
.block {
  @extend %mt5;
  span {
    @extend %pt5;
  }
}
```
12. sass插值
```scss
$properties: (margin, padding);
@mixin set-value($side, $value) {
    @each $prop in $properties {//对每个在$properties中的$prop,即$properties中的margin、padding
        #{$prop}-#{$side}: $value;//$prop连接参数$side，值为参数$value
    }
}
.login-box {
    @include set-value(top, 14px);//调用混合宏
}
```
```css
/*编译出的css*/
.login-box {
    margin-top: 14px;
    padding-top: 14px; 
}
```
13. sass 注释
- `/*注释内容*/` :会在编译出来的css文件中显示
- `//注释内容` ：不会在编译出来的css文件中显示
14. sass运算
- sass 加法/减法：不用类型的单位做加法/减法会报错
- sass 乘法
- sass 除法
    - 如果除式中没有变量或者不是在一个数学表达式中（有加法减法等），就要将除式运算用小括号括起来，否则`“/”`不会被当做除号运算
    - 除法中相同单位相除不会报错，会产生一个无单位的值
- sass 变量计算
```scss
$content-width: 720px;
$sidebar-width: 220px;
$gutter: 20px;
.container {
  width: $content-width + $sidebar-width + $gutter;
}
```
- sass数字运算
```scss
.box {
  width: ((220px + 720px) - 11 * 20 ) / 12 ;  
}
```
- sass颜色运算
```scss
p {
  color: #010203 + #040506;     //=>#050709
}
```
- sass 字符运算
    - 用`“+”`对字符串进行连接
    - 可以使用`“+”`直接连接字符
    - 有引号的字符串和没有引号的字符串相加，看哪个在`“+”`号的左边，如果有引号的在左边，结果为有引号的；如果没有引号的在左边，结果为没有引号的
15. 导入(@import)
- 编译时会将 `@import`的scss文件合并进来只生成一个CSS文件
- 如果在sass文件中导入css文件如 `@import 'reset.css'`，那效果跟普通CSS导入样式文件一样，导入的css文件不会合并到编译后的文件中，而是以 `@import`方式存在。
```scss
@import "reset.css";
@import "a";
p{
  background: #0982c1;
} 
```
```css
/*编译出的css */
@import "reset.css";
body {
  background: #eee;
}
p{
  background: #0982c1;
}
```
16. 函数(@function)
```scss
//sass style                    
$baseFontSize:      10px !default;
$gray:              #ccc !defualt;        
// pixels to rems 自己定义函数
@function pxToRem($px) {
  @return $px / $baseFontSize * 1rem;
}

body{
  font-size:$baseFontSize;
  color:lighten($gray,10%); //sass函数lighten
}
.test{
  font-size:pxToRem(16px);
  color:darken($gray,10%); //sass函数darken
}

//css style
body{
  font-size:10px;
  color:#E6E6E6;
}
.test{
  font-size:1.6rem;
  color:#B3B3B3;
}
```
17. 条件判断和循环
- `@if`判断
```scss
//sass style
$lte7: true;
$type: monster;
.ib{
    display:inline-block;
    @if $lte7 {
        *display:inline;
        *zoom:1;
    }
}
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}

//css style
.ib{
    display:inline-block;
    *display:inline;
    *zoom:1;
}
p {
  color: green; 
}
```
- 三目判断：`if($condition, $if_true, $if_false)`
```scss
if(true, 1px, 2px) => 1px
if(false, 1px, 2px) => 2px
```
- for循环
    - `@for $var from <start> through <end>`
    - `@for $var from <start> to <end>`
    ```scss
    //sass style
    @for $i from 1 through 3 {  //$i表示变量
        .item-#{$i} { width: 2em * $i; }
    }

    //css style
    .item-1 {
        width: 2em; 
    }
    .item-2 {
        width: 4em; 
    }
    .item-3 {
        width: 6em; 
    }
    ```
- `@each`循环：语法为：`@each $var in <list or map>`。其中`$var`表示变量，而`list`和`map`表示`list`类型数据和`map`类型数据
    - 单个字段list数据循环
    ```scss
    //sass style
    $animal-list: puma, sea-slug, egret, salamander;
    @each $animal in $animal-list {
        .#{$animal}-icon {
            background-image: url('/images/#{$animal}.png');
        }
    }

    //css style
    .puma-icon {
        background-image: url('/images/puma.png'); 
    }
    .sea-slug-icon {
        background-image: url('/images/sea-slug.png'); 
    }
    .egret-icon {
        background-image: url('/images/egret.png'); 
    }
    .salamander-icon {
        background-image: url('/images/salamander.png'); 
    }
    ```
    - 多个字段list数据循环
    ```scss
    //sass style
    $animal-data: (puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
    @each $animal, $color, $cursor in $animal-data {
        .#{$animal}-icon {
            background-image: url('/images/#{$animal}.png');
            border: 2px solid $color;
            cursor: $cursor;
        }
    }

    //css style
    .puma-icon {
        background-image: url('/images/puma.png');
        border: 2px solid black;
        cursor: default; 
    }
    .sea-slug-icon {
        background-image: url('/images/sea-slug.png');
        border: 2px solid blue;
        cursor: pointer; 
    }
    .egret-icon {
        background-image: url('/images/egret.png');
        border: 2px solid white;
        cursor: move; 
    }
    ```
    - 多个字段`map`数据循环
    ```scss
    //sass style
    $headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
    @each $header, $size in $headings {
        #{$header} {
            font-size: $size;
        }
    }

    //css style
    h1 {
        font-size: 2em; 
    }
    h2 {
        font-size: 1.5em; 
    }
    h3 {
        font-size: 1.2em; 
    }
    ```