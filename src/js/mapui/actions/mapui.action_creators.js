var Actions = require("./mapui.actions.js");

module.exports = {
    updateUser: function(name, value) {
        return {
            type: Actions.USER_LOGIN,
            name: name,
            value: value
        };
    },

    feedUpdate: function(data) {
        return {
            type: Actions.FEED_UPDATE,
            data: data
        };
    },

    aoiUpdate: function(data) {
        return {
            type: Actions.AOI_UPDATE,
            data: data
        };
    },

    centerUpdate: function(data) {
        return {
            type: Actions.CENTER_UPDATE,
            data: data
        }
    }
};