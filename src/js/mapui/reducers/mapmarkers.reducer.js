var MapUIActions = require("../actions/mapui.actions.js");

module.exports = function(state, action) {

    state = state || {
            center: {},
            search: "",
            selectedMarker: null,
            isFetching: false,
            searchResults: []
        };

    switch (action.type) {

        case MapUIActions.CENTER_UPDATE:
            return Object.assign({}, state, {
                center: {
                    latitude: parseFloat(action.data.latitude),
                    longitude: parseFloat(action.data.longitude)
                }
            });
        case MapUIActions.EXECUTE_SEARCH:
            return Object.assign({}, state, {
                isFetching: true
            });
        case MapUIActions.SELECT_MARKER:
            return Object.assign({}, state, {
                selectedMarker: action.data,
                center: {
                    latitude: parseFloat(action.data.lat),
                    longitude: parseFloat(action.data.lon)
                }
            });
        case MapUIActions.RECEIVE_SEARCH_RESULTS:
            var positionObj = null;
            var newPosition = null;
            var selectedMarker = null;

            if(action.results.length !== 0){
                selectedMarker = action.results[0];
                positionObj = action.results[0];
                newPosition = {
                    latitude: parseFloat(positionObj.lat),
                    longitude: parseFloat(positionObj.lon)
                };
            }

            return Object.assign({}, state, {
                isFetching: false,
                selectedMarker : selectedMarker,
                search: positionObj !== null ? positionObj.Placename : "",
                searchResults: action.results,
                center: newPosition !== null ? newPosition : state.center
            });
        default:
            return state;
    }
};