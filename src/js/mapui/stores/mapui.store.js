var createStore = require("redux").createStore;
var applyMiddleware = require("redux").applyMiddleware;
var compose = require("redux").compose;
var reducer = require("../reducers/mapui.reducer");
import thunkMiddleware from 'redux-thunk'

var enhancers = compose(
    window.devToolsExtension ?
        window.devToolsExtension() :
        function(store) {
            return store;
        }
);

module.exports = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware
    ));