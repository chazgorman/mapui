var ReactDOM = require("react-dom");
var Provider = require("react-redux").Provider;
var store = require("./stores/mapui.store");
var App = require("./containers/mapui.view.app");
var MapUIActionCreators = require("./actions/mapui.action_creators.js");
var initMapUI;
require("babel-polyfill");

initMapUI = function(config) {

    var startCoord = {latitude: config.coords.latitude,longitude: config.coords.longitude};
    store.dispatch(MapUIActionCreators.centerUpdate(startCoord));

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('map-container')
    );
};

module.exports = initMapUI;