(function () {
  'use strict';

  angular
    .module('mean.mapApp')
    .factory('MapApp', MapApp);

  MapApp.$inject = [];

  function MapApp() {
    return {
      name: 'mapApp'
    };
  }
})();
