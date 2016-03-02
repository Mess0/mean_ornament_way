(function () {
  'use strict';

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (MapApp, app, auth, database) {

    app.get('/api/mapApp/example/anyone', function (req, res, next) {
      res.send('Anyone can access this');
    });

    app.get('/api/mapApp/example/auth', auth.requiresLogin, function (req, res, next) {
      res.send('Only authenticated users can access this');
    });

    app.get('/api/mapApp/example/admin', auth.requiresAdmin, function (req, res, next) {
      res.send('Only users with Admin role can access this');
    });

    app.get('/api/mapApp/example/render', function (req, res, next) {
      MapApp.render('index', {
        package: 'mapApp'
      }, function (err, html) {
        //Rendering a view from the Package server/views
        res.send(html);
      });
    });
  };
})();
