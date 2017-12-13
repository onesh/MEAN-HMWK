var app = angular.module('angularjsnodejstutorial',[]);
app.controller('mycontroller', function($scope, $http) {
  $scope.searchMode = false;
  $scope.nodata = false;
  $scope.initSearch = function () {
      $scope.searchMode = !$scope.searchMode;
  };
        $scope.showData = false;
        $scope.data = {};
        $scope.Submit = function() {
        var request = $http({
              url: '/data',
              method: "GET",
              params: {email: $scope.email}
           });
        request.success(function(data) {
          if (data.length) {
            $scope.dataset = data;
            $scope.showData = true;
          } else {
            $scope.nodata = true;
            $scope.showData = false;
            setTimeout(function () {
              $scope.nodata = false;
            }, 2000)
          }
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
