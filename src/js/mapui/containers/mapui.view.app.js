var React = require("react");
var connect = require("react-redux").connect;
var MapUIActionCreators = require("../actions/mapui.action_creators.js");
var MapUIView = require("../components/MapUI");

var MapUIViewApp = React.createClass({
    displayName: "MapUIViewApp",
    propTypes: {
        aoiUpdate: React.PropTypes.func
    },

    componentDidMount: function() {

    },

    aoiUpdateFunc: function(data){
        console.log(data);
    },

    render: function() {
        const mapUI = (
            <MapUIView onBoundsChange={this.props.aoiUpdate}>
            </MapUIView>
        )
        return mapUI;
    }
});

var mapStateToProps = function(state) {
    return {

    };
};

var mapDispatchToProps = function(dispatch) {
    return {
        onUserLogin: function(data) {
            dispatch(MapUIActionCreators.updateUser(data.name,data));
        },
        onFeedUpdate: function(data) {
            dispatch(MapUIActionCreators.feedUpdate(data));
        },
        aoiUpdate: function(data) {
            dispatch(MapUIActionCreators.aoiUpdate(data));
        }
    }
};

module.exports = connect(mapStateToProps,mapDispatchToProps)(MapUIViewApp);