(function () {
  'use strict';

  angular
    .module('mean.mapApp')
    .config(mapApp);

  mapApp.$inject = ['$stateProvider'];

  function mapApp($stateProvider) {
    $stateProvider.state('mapApp example page', {
      url: '/mapApp/example',
      templateUrl: 'mapApp/views/index.html'
    });
  }

})();
