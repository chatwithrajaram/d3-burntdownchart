(function () {
  'use strict';

  angular.module('myApp.controllers')
    .controller('DemoCtrl', ['$scope', function($scope){
      $scope.title = "DemoCtrl";
      $scope.d3Data = [
        {name: "Greg", score:98},
        {name: "Ari", score:96},
        {name: "Loser", score: 48}
      ];

      $scope.ideal = [
        {date: new Date(2013, 1, 26), points: 50},
        {date: new Date(2013, 1, 28), points: 30},
        {date: new Date(2013, 2, 1), points: 20},
        {date: new Date(2013, 2, 8), points: 0}
      ];

      $scope.actual = [
        {date: new Date(2013, 1, 26), points: 50},
        {date: new Date(2013, 1, 27), points: 75},
        {date: new Date(2013, 1, 28), points: 42},
        {date: new Date(2013, 2, 1), points: 35},
        {date: new Date(2013, 2, 2), points: 29},
        {date: new Date(2013, 2, 3), points: 24},
        {date: new Date(2013, 2, 4), points: 18},
        {date: new Date(2013, 2, 5), points: 4},
        {date: new Date(2013, 2, 8), points: 0}
      ];

    }]);

}());
