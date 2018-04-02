var showapi_appid="26906";
var showapi_sign="b49688f784b44f86919b3baa484d36dd";
//type=10 图片 
//type=29 段子 
//type=31 声音 
//type=41 视频
function formatterDateTime() {
var date=new Date()
var month=date.getMonth() + 1
    var datetime = date.getFullYear()
            + ""// "年"
            + (month >= 10 ? month : "0"+ month)
            + ""// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}

//$.ajax({
//  type: 'post',
//  url: 'http://route.showapi.com/255-1',
//  dataType: 'jsonp',
//  data: {
//      "showapi_timestamp": formatterDateTime(),
//       "showapi_appid": showapi_appid, //这里需要改成自己的appid
//       "showapi_sign": showapi_sign,  //这里需要改成自己的应用的密钥secret，
// 		 "type":10,
// 		 "page":1,
//  },
//  jsonp: 'jsonpcallback', //这个方法名很重要,不能改变
//  error: function(XmlHttpRequest, textStatus, errorThrown) {
//      alert("操作失败!");
//  },
//  success: function(result) {
//      console.log(result.showapi_res_body.pagebean) //console变量在ie低版本下不能用
//  }
//});
