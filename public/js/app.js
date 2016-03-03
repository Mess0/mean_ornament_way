// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl', 'searchCtrl', 'headerCtrl', 'geolocation', 'gservice', 'ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Join Team Control Panel
        $routeProvider.when('/add', {
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

        // Search Control Panel
        }).when('/find', {
            controller: 'searchCtrl',
            templateUrl: 'partials/searchForm.html',

        // All else forward to the Join Team Control Panel
        }).otherwise({redirectTo:'/add'})
    });
