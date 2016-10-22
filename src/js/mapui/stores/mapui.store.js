var createStore = require("redux").createStore;
var compose = require("redux").compose;
var reducer = require("../reducers/mapui.reducer");

var enhancers = compose(
    window.devToolsExtension ?
        window.devToolsExtension() :
        function(store) {
            return store;
        }
);

module.exports = createStore(reducer, enhancers);