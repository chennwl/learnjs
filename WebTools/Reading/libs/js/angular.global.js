var globalApp=angular.module('globalApp',[]);
globalApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q) {
        return {
            'request': function (config) {
                return config || $q.when(config);
            },
            'requestError': function (rejection) {
                $('#mask').hide();
                return rejection;
            },
            'response': function (response) {
                 $('#mask').hide();
                return response || $q.when(response);
            },
            'responseError': function (response) {
                alert(response.status + ' - ' + response.statusText + '<br/>请求路径：<br/>' + response.config.url, '请求错误');
                $('#mask').hide();
                return $q.reject(response);
            }
        };
    });
}]);
