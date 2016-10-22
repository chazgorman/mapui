var MapUIActions = require("../actions/mapui.actions.js");

require("babel-polyfill");

module.exports = function(state, action) {
    var newState = {};

    state = state || {
            markers: [],
            cards: [],
            aoi: {}
        };

    switch (action.type) {

        default:
            return state;
    }
};