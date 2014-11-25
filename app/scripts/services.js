'use strict';

angular.module('F1FeederApp.services', [])
  .factory('ergastAPIservice', function($http) {
    var ergastAPI = {};

    ergastAPI.getDrivers = function(season) {
      //console.log('API' +season);
      //console.log('url: '+'http://ergast.com/api/f1/'+ season +'/driverStandings.json?callback=JSON_CALLBACK');
      return $http({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/'+ season +'/driverStandings.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getDriverDetails = function(id) {
      return $http({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/2014/drivers/'+ id + '/driverStandings.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getDriverRaces = function(id) {
      return $http({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/2014/drivers/'+ id + '/results.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getConstructors = function() {
      return $http({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/2014/constructorStandings.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getSeasons = function() {
      var initialYear = 1950;
      var actualYear = new Date().getFullYear();
      var offset = actualYear - initialYear -4;

      return $http({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/seasons.json?limit=5&offset='+ offset +'&callback=JSON_CALLBACK'
      });
    };

    return ergastAPI;
  });
