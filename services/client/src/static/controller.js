angular.module("myApp", []).controller("myAppCtrl", function ($scope, $http) {

    var refreshWaitTime = 10000;

    $scope.addUrl = function (original_url_entered) {
        var payload = {
            originalUrl: original_url_entered,
        };

        var data = JSON.stringify(payload);

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/urlhandler/createshorturl', data, config)
        .then(function successCallback(response){
            $scope.shortLink = response.data.shortLink;
            $scope.isSuccess = true;
        }, function errorCallback(response){
            console.log("Unable to perform request");
            $scope.isFailure = true;
        });
        setInterval(() => location.reload(), refreshWaitTime);
    };
});