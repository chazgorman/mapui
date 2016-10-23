var combineReducers = require("redux").combineReducers;
var mapMarkers = require("./mapmarkers.reducer");
var mapView = require("./mapview.reducer");

module.exports = combineReducers({
    mapMarkers,
    mapView
});