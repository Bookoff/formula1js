'use strict';

/**
 * @ngdoc function
 * @name Formula1JS.controller:driversController
 * @description
 * # driversController
 * Controller of the Formula1JS
 */
angular.module('Formula1JS.controllers', [])

  /* Drivers controller */
  .controller('driversController', function($scope, $routeParams, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.driversList = [];
    //$scope.year = $routeParams.year;
    /*if($routeParams.year !== undefined) {
       $scope.year = $routeParams.year;
    }else{
      $scope.year = new Date().getFullYear();
    }
    console.log($scope.year);*/
    $scope.round = null;
    $scope.searchFilter = function(driver) {
      var keyword = new RegExp($scope.nameFilter, 'i');
      return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
    };
    ergastAPIservice.getDrivers('2014')
      .success(function(response) {
        var standingsTable = response.MRData.StandingsTable;
        $scope.driversList = standingsTable.StandingsLists[0].DriverStandings;
        $scope.season = standingsTable.season;
        $scope.round = standingsTable.StandingsLists[0].round;
      });
  })

  /* Driver controller */
  .controller('driverController', function($scope, $routeParams, ergastAPIservice) {
    $scope.prixFilter = null;
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;
    $scope.season = '2014';
    $scope.searchFilter = function(grandprix) {
      var keyword = new RegExp($scope.nameFilter, 'i');
      return !$scope.prixFilter || keyword.test(grandprix.race.raceName);
    };

    /*Chartist config */
    // line chart
    $scope.data = {
      labels: ['Australia Grand Prix', 'Malaysia', 'Bahrein', 'China', 'Spain', 'Monaco', 'Canada', 'Austria', 'Britain', 'Germany', 'Hungary', 'Belgium'],
      series: [
        [1, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
        [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
      ]
    };

    $scope.options = {
        // Options for X-Axis
  axisX: {
    // The offset of the labels to the chart area
    offset: 15,
    // If labels should be shown or not
    showLabel: true,
    // If the axis grid should be drawn or not
    showGrid: true,
    // Interpolation function that allows you to intercept the value from the axis label
    labelInterpolationFnc: function(value){return value;}
  },
  // Options for Y-Axis
  axisY: {
    // The offset of the labels to the chart area
    offset: 15,
    // If labels should be shown or not
    showLabel: true,
    // If the axis grid should be drawn or not
    showGrid: true,
    // For the Y-Axis you can set a label alignment property of right or left
    labelAlign: 'right',
    // Interpolation function that allows you to intercept the value from the axis label
    labelInterpolationFnc: function(value){return value;},
    // This value specifies the minimum height in pixel of the scale steps
    scaleMinSpace: 50
  },
  // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
  width: undefined,
  // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
  height: undefined,
  // If the line should be drawn or not
  showLine: true,
  // If dots should be drawn or not
  showPoint: true,
  // If the line chart should draw an area
  showArea: true,
  // The base for the area chart that will be used to close the area shape (is normally 0)
  areaBase: 0,
  // Specify if the lines should be smoothed (Catmull-Rom-Splines will be used)
  lineSmooth: false,
  // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
  low: 1,
  // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
  high: 23,
  // Padding of the chart drawing area to the container element and labels
  chartPadding: 30
    };

    $scope.responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    /* end chartist */


    ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
    });

    ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races;
    });
  })

  /*Constructors Controller*/
  .controller('constructorsController', function($scope, ergastAPIservice) {
    $scope.constructorsList = [];
    $scope.constFilter = null;
    $scope.searchFilter = function(constructor) {
      var keyword = new RegExp($scope.constFilter, 'i');
      return !$scope.constFilter || keyword.test(constructor.Constructor.name);
    };

    ergastAPIservice.getConstructors()
      .success(function(response) {
        $scope.constructorsList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      });
  });
