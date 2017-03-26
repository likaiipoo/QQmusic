
var myService = angular.module('myService', []);

myService.service('load', ['$http', function($http){

    //
    this.getData = function(url, params, callback) {
        $http.get(url, {
            params: params
        }).success(function(data) {

            if (data) {
                callback(data.subjects);
            }
        })
    }

}]);