// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl', 'headerCtrl', 'geolocation', 'gservice', 'ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Add Control Panel
        $routeProvider.when('/add', {
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

        // Search Control Panel
        }).otherwise({redirectTo:'/add'})
    });
