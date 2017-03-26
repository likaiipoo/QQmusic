// 推荐
var myCtrl = angular.module('myCtrl', []);

myCtrl.controller('recommendCtrl', ['$scope', function($scope){

}]);

// 排行榜
myCtrl.controller('rankinglistCtrl', ['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading){

    $scope.items = [];
    $scope.iii = [];
    $scope.bbb = [];
    $scope.hotid = [{id : 3, name : '欧美'}, {id : 5, name : '内地'}, {id : 6, name : '港台'}, {
        id : 16, name : '韩国'
    }, {id : 17, name : '日本'}, {id : 18, name : '民谣'}, {id : 19, name : '摇滚'},]
    $ionicLoading.show({
        template : '<ion-spinner icon="android"></ion-spinner>'
    });
    for(var i = 0; i < $scope.hotid.length; i++){
        index = $scope.hotid[i].id;
        $scope.iii.push(index);
        $http.get('http://route.showapi.com/213-4', {
            params : {
                'showapi_appid' : 28328,
                'showapi_sign' : '687ffaa71820427288b3ec46c49b2117',
                'topid' : index
            }

        }).success(function(data){
            if(data && data.showapi_res_code === 0){
                $scope.items = data.showapi_res_body.pagebean.songlist.slice(0, 3);

                $ionicLoading.hide();
                $scope.bbb.push($scope.items)


            }
        });


    }


}]);


// 榜内歌曲
myCtrl.controller('rankinglist01Ctrl', ['$scope', '$http', '$ionicLoading', '$stateParams', function($scope, $http, $ionicLoading, $stateParams){

    $scope.items = [];

    // $scope.abc=$stateParams.id.split(",");


    $ionicLoading.show({
        template : '<ion-spinner icon="android"></ion-spinner>'
    });

    $http.get('http://route.showapi.com/213-4', {
        params : {
            'showapi_appid' : 28328,
            'showapi_sign' : '687ffaa71820427288b3ec46c49b2117',
            'topid' : 26
        }
    }).success(function(data){
        if(data && data.showapi_res_code === 0){
            $scope.items = data.showapi_res_body.pagebean.songlist;

            $ionicLoading.hide();
        }
    });


}]);


// 搜索
myCtrl.controller('searchCtrl', ['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading){
    $scope.items = [];
    $scope.searchObj = {task : ''};
    $scope.search = function(){

        $ionicLoading.show({
            template : '<ion-spinner icon="android"></ion-spinner>'
        });
        $http.get('http://route.showapi.com/213-1', {
            params : {
                'showapi_appid' : 28328,
                'showapi_sign' : '687ffaa71820427288b3ec46c49b2117',

                'keyword' : $scope.searchObj.task
            }
        }).success(function(data){

            if(data && data.showapi_res_code === 0){

                $scope.items = data.showapi_res_body.pagebean.contentlist;
            }
            $ionicLoading.hide();
        });
    }

}]);


// 详情页
myCtrl.controller('detailCtrl', ['$scope', '$http', '$stateParams', '$sce', function($scope, $http, $stateParams, $sce){

    $scope.str = "";
    $scope.src = $sce.trustAsResourceUrl($stateParams.url);
    $scope.img01 = $stateParams.img;
    // $ionicBackdrop.retain();
    $scope.bimg01 = $stateParams.bimg;
    $scope.singername01 = $stateParams.singername;
    $scope.songname01 = $stateParams.songname;
    $http.get('http://route.showapi.com/213-2', {
        params : {
            'showapi_appid' : 28328,
            'showapi_sign' : '687ffaa71820427288b3ec46c49b2117',

            'musicid' : $stateParams.id
        }
    }).success(function(data){

        if(data && data.showapi_res_code === 0){

            $scope.str = reconvert(data.showapi_res_body.lyric);
            console.log($scope.str);
                playNow($scope.str);


        }

    });
$scope.stop=function(){
zanting()
}


}]);




function reconvert(str){
    str = str.replace(/(\\u)(\w{1,4})/gi, function($0){
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
    });
    return parseLyric(str);
}

function parseLyric(lrc){
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i = 0; i < lyrics.length; i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg, '');

        for(var k = 0, h = timeRegExpArr.length; k < h; k++){
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}

function playNow(str){
     play = document.getElementById('play');
    play.ontimeupdate=function(){
        var currentTime=Math.round(this.currentTime);
        var index01=str[currentTime];
        for(var i in str){
            if(i==currentTime){
                $('.i'+i).addClass('on').siblings().removeClass('on');
                var top = $('.i'+i)[0].offsetTop;
                $('#box').animate({'top':-top+150},300)

            }
        }
    }
}

function zanting(){

    if(play!==null){


        if(!play.paused)
        {
            play.pause();// 这个就是暂停//audio.play();// 这个就是播放


        }else {
            play.play()
        }
    }
}



