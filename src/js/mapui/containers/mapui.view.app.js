var React = require("react");
var connect = require("react-redux").connect;
var MapUIActionCreators = require("../actions/mapui.action_creators.js");
var MapUIView = require("../components/MapUI");
var Header = require("../../components/layout/hero.header");
var Footer = require("../../components/layout/footer");

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
        const mapDivStyle = {
            margin: "10px"
        };

        const mapUI = (
            <MapUIView onBoundsChange={this.props.aoiUpdate}>
            </MapUIView>
        );

        const header = (
            <Header title={"Demo Map with React & Leaflet"}>
            </Header>
        );

        var titleAndTextLink = {
            text: " Charlie Gorman",
            link: "https://www.linkedin.com/in/charliegorman"
        };

        const footer = (
            <Footer
                title={"Demo Map with React & Leaflet"}
                titleTextAndLink={titleAndTextLink}
                twitterName={"ChazGorman"}
                githubName={"chazgorman"}
                githubProject={"mapui"}>
            </Footer>
        );

        return (
            <div>
                {header}
                <div style={mapDivStyle}>
                    {mapUI}
                </div>
                {footer}
            </div>
        );
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