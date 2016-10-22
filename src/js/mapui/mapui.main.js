var ReactDOM = require("react-dom");
var Provider = require("react-redux").Provider;
var store = require("./stores/mapui.store");
var App = require("./containers/mapui.view.app");
var initMapUI;

initMapUI = function(config) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('map-container')
    );
};

module.exports = initMapUI;