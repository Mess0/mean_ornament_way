// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function ($rootScope, $http) {

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};
        googleMapService.clickLat = 0;
        googleMapService.clickLong = 0;
        googleMapService.currentSelectedMarker = {};

        // Redirect locations to form panel
        googleMapService.clickedLocation = {};

        // Array of locations obtained from API calls
        var locations = [];
        // Variables we'll use to help us pan to the right spot
        var lastMarker;

        // Map Selected Location (initialize to UA region )
        var selectedLat = 49.45;
        var selectedLong = 31.70;


        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Takes three parameters (lat, long, and filtering results)

        // redirect object data to add form
        var redirectOnForm = function (location) {
            googleMapService.clickedLocation = location;
            $rootScope.$broadcast("redirectOnForm");

        };


        googleMapService.refresh = function (latitude, longitude, filteredResults) {

            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // If filtered results are provided in the refresh() call...
            if (filteredResults) {

                // Then convert the filtered results into map points.
                locations = convertToMapPoints(filteredResults);

                // Then, initialize the map -- noting that a filter was used (to mark icons yellow)
                initialize(latitude, longitude);
            }

            // If no filter is provided in the refresh() call...
            else {

                // Perform an AJAX call to get all of the records in the db.
                $http.get('/maps').success(function (response) {

                    // Then convert the results into map points
                    locations = convertToMapPoints(response);

                    // Then initialize the map -- noting that no filter was used.
                    initialize(latitude, longitude);
                }).error(function () {
                });
            }
        };

        // Private Inner Functions
        // --------------------------------------------------------------

        // Convert a JSON of /maps into map points
        var convertToMapPoints = function (response) {

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for (var i = 0; i < response.length; i++) {
                var map = response[i];

                // Create popup windows for each record
                var contentString = '<p><b>Name</b>: ' + map.Name + '<br><b>Адреса</b>: ' + map.Region + ',' + map.Address + ',' + map.City + '<br>' +
                    '<b>Инфраструктура</b>: ' + map.Type + '</p>' + '<button onclick="redirectOnForm(map)">Click me</button>';

                // Converts each of the JSON records into Google Maps Location format (Note Lat, Lng format).
                locations.push(new Location(
                    new google.maps.LatLng(map.GPSlatitude, map.GPSlongitude)
                    ,
                    new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    map.Address,
                    map.Name,
                    map.Type,
                    map.City,
                    map.Region,
                    map._id
                ));
            }
            // location is now an array populated with records in Google Maps format
            console.log(locations);
            return locations;

        };

        // Constructor for generic location
        var Location = function (latlon, message, Address, Name, Type, City, Region, id) {
            this.latlon = latlon;
            this.Name = Name;
            this.Address = Address;
            this.City = City;
            this.Region = Region;
            this.message = message;
            this._id = id;

        };

        // Initializes the map
        var initialize = function (latitude, longitude) {

            // Uses the selected lat, long as starting point
            var myLatLng = {lat: selectedLat, lng: selectedLong};

            // If map has not been created...
            if (!map) {

                // Create a new map and place in the index.html page
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 3,
                    center: myLatLng
                });
            }

            // Loop through each location in the array and place a marker
            locations.forEach(function (n, i) {
                var marker = new google.maps.Marker({
                    position: n.latlon,
                    map: map,
                    title: "",
                    icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0'

                });

                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function (e) {

                    // When clicked, open the selected marker's message
                    currentSelectedMarker = n;
                    n.message.open(map, marker);
                    $rootScope.$broadcast('redirectOnForm')
                });
            });

            // Set initial location as a bouncing red marker
            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            lastMarker = marker;

            // Function for moving to a selected location
            map.panTo(new google.maps.LatLng(latitude, longitude));

            // Clicking on the Map moves the bouncing red marker
            google.maps.event.addListener(map, 'click', function (e) {
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    animation: google.maps.Animation.DROP,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                });

                // When a new spot is selected, delete the old red bouncing marker
                if (lastMarker) {
                    lastMarker.setMap(null);
                }

                // Create a new red bouncing marker and move to it
                lastMarker = marker;
                map.panTo(marker.position);

                // Update Broadcasted Variable (lets the panels know to change their lat, long values)
                googleMapService.clickLat = marker.getPosition().lat();
                googleMapService.clickLong = marker.getPosition().lng();
                $rootScope.$broadcast("clicked");
            });
        };

        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh(selectedLat, selectedLong));

        return googleMapService;
    });

