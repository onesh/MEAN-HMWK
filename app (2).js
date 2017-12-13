var app = angular.module('angularjsnodejstutorial',[]);
app.controller('mycontroller', function($scope, $http) {
        $scope.showData = false;
        $scope.data = {};
        $scope.Submit = function() {
        var request = $http({
              url: '/data',
              method: "GET",
              params: {email: $scope.email}
           });
        request.success(function(data) {
            $scope.data = data;
            $scope.showData = true;
        });
        request.error(function(data){
            console.log('err');
        });

    };
});

app.controller('insertController', function($scope, $http) {
     $scope.Insert = function() {
        var request = $http.get('/insert/'+$scope.login+'&'+$scope.name+'&'+$scope.sex+'&'+$scope.RelationshipStatus+'&'+$scope.Birthyear);
        request.success(function(data) {
            $scope.message = "Insertion successful!";
        });
        request.error(function(data){
            console.log('err');
        });
    };

});
