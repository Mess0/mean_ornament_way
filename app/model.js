// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Map Schema to store map data in the db
var MapSchema = new Schema({

    Name: {type: String, required: true},
    Type: {type: String, required: true},
    City: {type: String, required: true},
    Address: {type: String, required: true},
    Region: {type: String, required: true},
    GPSlatitude: {type: String, required: true},
    GPSlongitude: {type: String, required: true}




    //Subtype
    //
    //
    //Place ID
    //WorkingHours
    //E-mail
    //Website
    //Phone
    //Description
    //Comfort
    //Images.Search Result
    //Images.Background
    //Images.Other

});



// Indexes this schema in geoJSON format (critical for running proximity searches)
MapSchema.index({location: '2dsphere'});

// Exports the MapSchema for use elsewhere. Sets the MongoDB collection
module.exports = mongoose.model('ornament_way_map', MapSchema);
