var MapUIActions = require("../actions/mapui.actions.js");

module.exports = function(state, action) {

    state = state || {
            aoi: {},
            mapType: "Default"
        };

    switch (action.type) {

        case MapUIActions.AOI_UPDATE:
            return Object.assign({}, state, {aoi: action.data});
        case MapUIActions.SET_MAP_TYPE:
            return Object.assign({}, state, {mapType: action.data});
        default:
            return state;
    }
};