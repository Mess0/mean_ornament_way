// Dependencies
var mongoose = require('mongoose');
var Map = require('./model.js');


// Opens App Routes
module.exports = function (app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all map objects in the db
    app.get('/maps', function (req, res) {

        // Uses Mongoose schema to run the search (empty conditions)
        var search = Map.find({});
        search.exec(function (err, maps) {
            if (err) {
                res.send(err);
            } else {
                res.json(maps);

            }
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new map objects in the db
    app.post('/maps', function (req, res) {
        console.log(req);

        // Creates a new Map based on the Mongoose schema and the post body
        var newMap = new Map(req.body);

        // New Map is saved in the db.
        newMap.save(function (err) {
            if (err) {
                //console.log(err);
                res.send(err);
            }
            else {
                res.json(req.body);

            }
        });
    });

    // DELETE Routes (Dev Only) And not work yet
    // --------------------------------------------------------
    // Delete a Map off the Map based on objID
    app.delete('/maps/:objID', function (req, res) {
        var objID = req.params.objID;
        var update = req.body;

        Map.findByIdAndRemove(objID, update, function (err, maps) {
            if (err)
                res.send(err);
            else
                res.json(req.body);
        });
    });
};
