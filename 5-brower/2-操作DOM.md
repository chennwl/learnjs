## 操作DOM
- 更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容；
- 遍历：遍历该DOM节点下的子节点，以便进行进一步操作；
- 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点；
- 删除：将该节点从HTML中删除，相当于删掉了该DOM节点的内容以及它包含的所有子节点。
- 获取DOM节点
    - `document.getElementById()`和`document.getElementsByTagName()`，以及CSS选择器`document.getElementsByClassName()`，后两个都是返回一组DOM节点；
    - 使用`querySelector()`和`querySelectorAll()`
    ```javascript
    // 通过querySelector获取ID为q1的节点：
    var q1 = document.querySelector('#q1');

    // 通过querySelectorAll获取q1节点内的符合条件的所有节点：
    var ps = q1.querySelectorAll('div.highlighted > p');
    //低版本的IE<8不支持querySelector和querySelectorAll。IE8仅有限支持
    ```