'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MapApp = new Module('mapApp');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MapApp.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  MapApp.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  MapApp.menus.add({
    title: 'mapApp example page',
    link: 'mapApp example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  MapApp.aggregateAsset('css', 'mapApp.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    MapApp.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    MapApp.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    MapApp.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return MapApp;
});
