// Dependencies
var mongoose        = require('mongoose');
var Map             = require('./model.js');


// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/maps', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var search = Map.find({});
        search.exec(function(err, maps){
            if(err) {
                res.send(err);
            } else {
                // If no errors are found, it responds with a JSON of all users
                res.json(maps);

            }
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/maps', function(req, res){
        console.log(req);

        // Creates a new Map based on the Mongoose schema and the post body
        var newMap = new Map(req.body);

        // New Map is saved in the db.
        newMap.save(function(err){
            if(err) {
                //console.log(err);
                res.send(err);
            }
            else {
                // If no errors are found, it responds with a JSON of the new user

                res.json(req.body);

            }
        });
    });

    // Retrieves JSON records from  search controller
    app.post('/search/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var Name            = req.body.Name;
        var Type            = req.body.Type;
        var Address         = req.body.Address;
        var City            = req.body.City;
        var Region          = req.body.Region;


        // Opens a generic Mongoose Query. Depending on the post body
        var search = Map.find({});
        
    });

    // DELETE Routes (Dev Only) And not work yet
    // --------------------------------------------------------
    // Delete a Map off the Map based on objID
    app.delete('/maps/:objID', function(req, res){
        var objID = req.params.objID;
        var update = req.body;

        Map.findByIdAndRemove(objID, update, function(err, maps){
            if(err)
                res.send(err);
            else
                res.json(req.body);
        });
    });
};
