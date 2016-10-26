var MapUIActions = require("../actions/mapui.actions.js");

module.exports = function(state, action) {

    state = state || {
            aoi: {}
        };

    switch (action.type) {

        case MapUIActions.AOI_UPDATE:
            return Object.assign({}, state, {aoi: action.data});

        default:
            return state;
    }
};