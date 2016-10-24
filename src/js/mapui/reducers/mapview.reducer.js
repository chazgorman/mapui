var MapUIActions = require("../actions/mapui.actions.js");

module.exports = function(state, action) {

    state = state || {
            aoi: {},
            center: {},
            search: "",
            isFetching: false,
            searchResult: {}
        };

    switch (action.type) {

        case MapUIActions.AOI_UPDATE:
            return Object.assign({}, state, {aoi: action.data});
        case MapUIActions.CENTER_UPDATE:
            return Object.assign({}, state, {center: action.data});
        case MapUIActions.EXECUTE_SEARCH:
            return Object.assign({}, state, {
                isFetching: true
            });
        case MapUIActions.RECEIVE_SEARCH_RESULTS:
            var positionObj = null;
            var newPosition = null;

            if(typeof action.results.geocode_result !== 'undefined'){
                positionObj = JSON.parse(action.results.geocode_result);
                newPosition = {
                    latitude: parseFloat(positionObj.Latitude),
                    longitude: parseFloat(positionObj.Longitude)
                };
            }

            return Object.assign({}, state, {
                isFetching: false,
                search: positionObj !== null ? positionObj.Placename : "",
                searchResult: action.results,
                center: newPosition !== null ? newPosition : state.center
            });
        default:
            return state;
    }
};