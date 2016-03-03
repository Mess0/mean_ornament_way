// Creates the addCtrl Module and Controller. Note that it depends on 'geolocation' and 'gservice' modules.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;


    // Set initial coordinates to the UA region
    $scope.formData.longitude = 31.70;
    $scope.formData.latitude = 49.45;

    // Get Map's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        // Display message confirming that the coordinates verified.
        $scope.formData.htmlverified = "Дякуюємо за те, ща надали нам ваші координати";

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    // Functions
    // ----------------------------------------------------------------------------

    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Ні,це не Ваше місце знаходження";
        });
    });

    // Function for refreshing the HTML5 verified location (used by refresh button)
    $scope.refreshLoc = function(){
        geolocation.getLocation().then(function(data){
            coords = {lat:data.coords.latitude, long:data.coords.longitude};

            $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
            $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
            $scope.formData.htmlverified = "Дякуюємо за те, ща надали нам ваші координати";
            gservice.refresh(coords.lat, coords.long);
        });
    };

    // Creates a new user based on the form fields
    $scope.createMap = function() {

        // Grabs all of the text box fields
        var userData = {
            Name: $scope.formData.Name,
            Type: $scope.formData.Type,
            Address: $scope.formData.Address,
            City:$scope.formData.City,
            Region:$scope.formData.Region,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/maps', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.Name = "";
                $scope.formData.Type = "";
                $scope.formData.Address = "";
                $scope.formData.City = "";
                $scope.formData.Region = "";

                // Refresh the map with new data
                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});

