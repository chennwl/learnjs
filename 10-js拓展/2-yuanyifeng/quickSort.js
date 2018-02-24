/**
 * 快速排序思想：
 * （1）在数据集之中，选择一个元素作为"基准"（pivot）。
 * （2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
 * （3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 */

 /**
  * @params arr数组
  * @return 排序好的数组
  */
var quickSort = function (arr) {  
    if(arr.length <= 1){return arr}
    var pivotIndex = Math.floor(arr.length / 2); //Math.floor()对数进行上舍入 Math.ceil()对数进行下舍入
    var pivot = arr.splice(pivotIndex, 1)[0]; //返回删除的元素数组
    var left = [];
    var right = [];
    for(let i = 0;i < arr.length;i++){
        if(arr[i] < pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));   //递归调用
}
