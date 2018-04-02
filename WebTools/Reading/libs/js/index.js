//定义首页app
var indexApp=angular.module('indexApp', ['ionic'])		//依赖注入了ionic这个模块，里面定义的所有过滤器、服务、指令等都可以调用

indexApp.controller('indexController', function ($scope,$ionicScrollDelegate,$ionicSideMenuDelegate,$http,$ionicSlideBoxDelegate) {
	$scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
   	};
   	$scope.openMenuBtn=function(){
   		$ionicSideMenuDelegate.toggleLeft();
   	}
   	$scope.photoArr=[];
   	$('#mask').show();
   	var photoPage=1;
   	var roadPage=1;
   	var musicPage=1;
   	var videoPage=1;


//初始发起第一页请求
	$http({
		url: 'http://route.showapi.com/255-1',
		method:'GET',
		params:{
			"showapi_timestamp": formatterDateTime(),
	         "showapi_appid": showapi_appid,
	         "showapi_sign": showapi_sign,
	 		 "type":10,
	 		 "page":photoPage,
		}
	}).success(function(result){
	    $scope.photoArr=result.showapi_res_body.pagebean.contentlist;
	    $scope.$broadcast('scroll.infiniteScrollComplete');
        $('.emptyBox').eq(0).remove();
        $('#mask').hide();
	})

//showAll显示图片全部信息
$scope.showAll=function(photo,$index){
	if(photo.image0.split('.')[photo.image0.split('.').length-1]=="gif"){
		$('#showAllBox').css({'paddingTop':'50%'})
	}else{
		$('#showAllBox').css({'paddingTop':'0%'})
	}
	$('#showAllBox').empty();	//移除里面的内容
	var _html='<img src="'+photo.image0+'">';
	$(_html).appendTo('#showAllBox');
	$('#showAllBox').show(400);
}

//下拉刷新
$scope.doRefresh = function(type,Arr) {
    $http({
    	url: 'http://route.showapi.com/255-1',
		method:'GET',
		params:{
			"showapi_timestamp": formatterDateTime(),
	         "showapi_appid": showapi_appid,
	         "showapi_sign": showapi_sign,
	 		 "type":type,
	 		 "page":parseInt(10*Math.random()),
		}
    }).success(function(result) {
        $scope[Arr]=result.showapi_res_body.pagebean.contentlist;
        $scope.$broadcast('scroll.infiniteScrollComplete');
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
};

//加载更多内容
$scope.loadMore = function(type,Arr) {
	photoPage++;
    $http({
    	url: 'http://route.showapi.com/255-1',
		method:'GET',
		params:{
			"showapi_timestamp": formatterDateTime(),
	         "showapi_appid": showapi_appid,
	         "showapi_sign": showapi_sign,
	 		 "type":type,
	 		 "page":photoPage,
		}
    }).success(function(result) {
        $scope[Arr]=$scope[Arr].concat(result.showapi_res_body.pagebean.contentlist);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });
};


$scope.$on('stateChangeSuccess', function() {
    $scope.loadMore();
});

//滑动更换频道后请求
$('footer div').removeClass('opacity8').eq(0).addClass('opacity8');
$scope.slide=function(index){
	switch (index){
		case 0:
			$('footer div').removeClass('opacity8').eq(0).addClass('opacity8');
			break;
		case 1:
			//段子区域
			$('footer div').removeClass('opacity8').eq(1).addClass('opacity8');
			if($scope.roadArr){

			}else{
				$scope.roadArr=[];
				$('#mask').show();
				 $http({
			    	url: 'http://route.showapi.com/255-1',
					method:'GET',
					params:{
						"showapi_timestamp": formatterDateTime(),
				         "showapi_appid": showapi_appid,
				         "showapi_sign": showapi_sign,
				 		 "type":29,
				 		 "page":roadPage,
					}
			    }).success(function(result) {
			        $scope.roadArr=result.showapi_res_body.pagebean.contentlist;
			        $scope.$broadcast('scroll.infiniteScrollComplete');
			        $('.emptyBox','ion-slide:eq('+1+')').remove();
	        		$('#mask').hide();
			    });
			}
			break;
		case 2:
			//音乐区域
			$('footer div').removeClass('opacity8').eq(2).addClass('opacity8');
			if($scope.musicArr){

			}else{
				$scope.musicArr=[];
				$('#mask').show();
				 $http({
			    	url: 'http://route.showapi.com/255-1',
					method:'GET',
					params:{
						"showapi_timestamp": formatterDateTime(),
				         "showapi_appid": showapi_appid,
				         "showapi_sign": showapi_sign,
				 		 "type":31,
				 		 "page":musicPage,
					}
			    }).success(function(result) {
			        console.log(result.showapi_res_body.pagebean.contentlist);
			        $scope.musicArr=result.showapi_res_body.pagebean.contentlist;
			        $scope.$broadcast('scroll.infiniteScrollComplete');
			        $('.emptyBox','ion-slide:eq('+2+')').remove();
	        		$('#mask').hide();
			    });
			}
			break;
		case 3:
			//视频区域
			$('footer div').removeClass('opacity8').eq(3).addClass('opacity8');
			if($scope.videoArr){

			}else{
				$scope.videoArr=[];
				$('#mask').show();
				 $http({
			    	url: 'http://route.showapi.com/255-1',
					method:'GET',
					params:{
						"showapi_timestamp": formatterDateTime(),
				         "showapi_appid": showapi_appid,
				         "showapi_sign": showapi_sign,
				 		 "type":41,
				 		 "page":videoPage,
					}
			    }).success(function(result) {
			        $scope.videoArr=result.showapi_res_body.pagebean.contentlist;
			        $scope.$broadcast('scroll.infiniteScrollComplete');
			        $('.emptyBox','ion-slide:eq('+3+')').remove();
	        		$('#mask').hide();
			    });
			}
			break;
		default:
			break;
	}
}

//更换频道
$scope.changeChannel=function(channel){
	console.log(channel);
	switch (channel){
		case 'photo':
			$ionicSlideBoxDelegate.slide(0);
			break;
		case 'laught':
			$ionicSlideBoxDelegate.slide(1);
			break;
		case 'music':
			$ionicSlideBoxDelegate.slide(2);
			break;
		case 'video':
			$ionicSlideBoxDelegate.slide(3);
			break;
		default:
			break;
	}
}

//播放视频
$scope.playVideo=function(video){
	console.log(video.video_uri);
	$('#showVideoBox').show(400);
	$('#showVideoBox video').attr("src",video.video_uri);
}

//菜单事件
$scope.slideTo=function(index){
	$ionicSlideBoxDelegate.slide(index);
	$ionicSideMenuDelegate.toggleLeft();
}

//搜索事件
$scope.showSearchBox=function(){
	$('#serachBox').slideDown(300);
//	$('.serachContentBox').empty();
	$('#serachBox input').focus();
}
$scope.hideSearchBox=function(){
	$('#serachBox').slideUp(300);
}

$scope.search=function(){
	var curChannel=$('.opacity8').text();
	var type=10;
	var keyWord=$('#serachBox input').val();
	switch (curChannel){
		case 'photo':
			type=10
			break;
		case 'laught':
			type=29
			break;
		case 'music':
			type=31
			break;
		case 'video':
			type=41
			break;
		default:
			break;
	}
	$('#mask').show();
	$http({
    	url: 'http://route.showapi.com/255-1',
		method:'GET',
		params:{
			"showapi_timestamp": formatterDateTime(),
	         "showapi_appid": showapi_appid,
	         "showapi_sign": showapi_sign,
	 		 "type":type,
	 		 "title":keyWord,
	 		 "page":1,
		}
    }).success(function(result) {
        console.log(result.showapi_res_body.pagebean.contentlist);
        $('#mask').hide();
        $scope.searchResult=result.showapi_res_body.pagebean.contentlist;
    });
}

//点击具体搜索结果进行对应处理showSearchDetails
$scope.showSearchDetails=function(result){
	console.log(result)
}

});

//重写ion-slide-box
indexApp.directive('ionSlideBox',function(){
	return function(scope,element,attrs){
		$(element).height($(element).parents('ion-content').height());
	}
})

//音频过滤器（添加信任）
indexApp.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


//jquery事件
$(function(){
	$('#showAllBox').on('click',function(){
		$(this).hide(400);
	})
	$('#showVideoBox').on('click',function(){
//		$(this).hide(400);
	})
	$('#showVideoBox video').on('click',function(){
		if(this.paused){
			this.play();
		}else{
			this.pause();
		}
	})
	$('#showVideoBox span').on('click',function(){
		$(this).siblings('video')[0].pause();
		$(this).parents('#showVideoBox').css({'display':'none'});
	})
//天气预报
	$.get('http://wthrcdn.etouch.cn/weather_mini?city=广州',function(data){
		var _html='<div class="weatherBox"> <p>'+data.data.city+'</p> <p>'+data.data.wendu+'°C</p> <p>'+data.data.ganmao+'</p> <input type="text" placeholder="更换城市" id="cityname"> </div>';
		$(_html).appendTo('.leftMenu .list li:eq('+0+')');

		$('.leftMenu .list li:eq('+0+')').on('click',function(){
	   		var city=$('#cityname').val();
	   		$.get('http://wthrcdn.etouch.cn/weather_mini?city='+city,function(data){
	   			if(data.status=="1000"){
	   				console.log(data)
	   				$('.weatherBox').remove();
	   				var _html='<div class="weatherBox"> <p>'+data.data.city+'</p> <p>'+data.data.wendu+'°C</p> <p>'+data.data.ganmao+'</p> <input type="text" placeholder="更换城市" id="cityname"> </div>';
					$(_html).appendTo('.leftMenu .list li:eq('+0+')');
	   			}
	   		},'json')
	   	})
	},'json')
})

