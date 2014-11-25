'use strict';

angular.module('F1FeederApp.directives', [])
    .directive('navbar', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/navbar.html',
        controller: function($scope, ergastAPIservice, $location) {
          /* Seasons Controller*/
          $scope.seasonsList = [];

          ergastAPIservice.getSeasons()
            .success(function(response) {
              $scope.seasonsList = response.MRData.SeasonTable.Seasons;
            });

          $scope.changeSeason = function (newSeason) {
            var currentPath = $location.path();
            $location.path(currentPath +'/season/'+newSeason);
            //return false;
         };
        }
      };
    });
