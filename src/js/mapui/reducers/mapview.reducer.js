var MapUIActions = require("../actions/mapui.actions.js");

require("babel-polyfill");

module.exports = function(state, action) {
    var newState = {};

    state = state || {
            aoi: {},
            center: {}
        };

    switch (action.type) {

        case MapUIActions.AOI_UPDATE:
            return Object.assign({}, state, {aoi: action.data});
            break;
        case MapUIActions.CENTER_UPDATE:
            return Object.assign({}, state, {center: action.data});
            break;
        default:
            return state;
    }
};