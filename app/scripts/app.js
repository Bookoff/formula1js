'use strict';

/**
 * @ngdoc overview
 * @name F1FeederApp
 * @description
 * # F1FeederApp
 *
 * Main module of the application.
 */
angular
  .module('F1FeederApp', [
    'F1FeederApp.controllers',
    'F1FeederApp.services',
    'F1FeederApp.directives',
    'ngRoute',
    'ngChartist'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/drivers', {
        templateUrl: 'views/drivers.html',
        controller: 'driversController'
      })
      .when('/drivers/:id', {
        templateUrl: 'views/driver.html',
        controller: 'driverController'
      })
      .when('/drivers/season/:year', {
        templateUrl: 'views/drivers.html',
        controller: 'driverController'
      })
      .when('/constructors', {
        templateUrl: 'views/constructors.html',
        controller: 'constructorsController'
      })
      .otherwise({
        redirectTo: '/drivers'
      });
  });
