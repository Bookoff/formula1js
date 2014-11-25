'use strict';

/**
 * @ngdoc overview
 * @name Formula1JS
 * @description
 * # Formula1JS
 *
 * Main module of the application.
 */
angular
  .module('Formula1JS', [
    'Formula1JS.controllers',
    'Formula1JS.services',
    'Formula1JS.directives',
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
