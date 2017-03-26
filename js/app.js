var app=angular.module('myApp',['ionic','myCtrl']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider.state('main',{
        url:'/qqy',
        templateUrl:'view/main.html'
        // abstract:true
    }).state('main.recommend',{
        url:'/recommend',
        views:{
            'recommend':{
                templateUrl:'view/recommend.html',
                controller:'recommendCtrl'
            }
        }

    }).state('main.rankinglist',{
        url:'/rankinglist',
        views:{
            'rankinglist':{
                templateUrl:'view/rankinglist.html',
                controller:'rankinglistCtrl'
            }
        }

    }).state('main.search',{
        url:'/search',
        views:{
            'search':{
                templateUrl:'view/search.html',
                controller:'searchCtrl'
            }
        }

    }).state('detail', {
        url: '/detail/:id/:url:/:img/:bimg/:singername/:songname',

        templateUrl: 'view/detail.html',
        controller: 'detailCtrl'
    }).state('rankinglist01', {
        url: '/rankinglist01/:id',
        templateUrl: 'view/rankinglist01.html',
        controller: 'rankinglist01Ctrl'
    })


    $urlRouterProvider.otherwise('/qqy/recommend');


}]);