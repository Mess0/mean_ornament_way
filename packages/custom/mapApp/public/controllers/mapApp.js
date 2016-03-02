(function () {
  'use strict';

  /* jshint -W098 */
  angular
    .module('mean.mapApp')
    .controller('MapAppController', MapAppController);

  MapAppController.$inject = ['$scope', 'Global', 'MapApp'];

  function MapAppController($scope, Global, MapApp) {
    $scope.global = Global;
    $scope.package = {
      name: 'mapApp'
    };
  }
})();