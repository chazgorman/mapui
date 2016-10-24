var React = require("react");
var connect = require("react-redux").connect;
var MapUIActionCreators = require("../actions/mapui.action_creators.js");
var MapUIView = require("../components/MapUI");
var Header = require("../../components/layout/hero.header");
var Footer = require("../../components/layout/footer");
var MediumInput = require("../../components/form/medium.input");

var MapUIViewApp = React.createClass({
    displayName: "MapUIViewApp",
    propTypes: {
        aoiUpdate: React.PropTypes.func,
        centerPosition: React.PropTypes.object,
        isFetching: React.PropTypes.bool,
        search: React.PropTypes.string
    },

    componentDidMount: function() {

    },

    searchFunc: function(data){
        this.props.executeSearch(data);
    },

    render: function() {
        const mapDivStyle = {
            margin: "10px"
        };

        const locationSelect = (
            <MediumInput name="place-name-select"
                         placeholder={"Search..."}
                         onSubmit={this.searchFunc}
                         isFetching={this.props.isFetching}
            />
        );

        const mapUI = (
            <MapUIView onBoundsChange={this.props.aoiUpdate}
                       startPosition={this.props.centerPosition}
                       markerText={this.props.search}>
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
                    {locationSelect}
                    {mapUI}
                </div>
                {footer}
            </div>
        );
    }
});

var mapStateToProps = function(state) {
    return {
        centerPosition: state.mapView.center,
        isFetching: state.mapView.isFetching,
        search: state.mapView.search
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
        },
        executeSearch: function(data){
            dispatch(MapUIActionCreators.fetchSearch(data));
        }
    }
};

module.exports = connect(mapStateToProps,mapDispatchToProps)(MapUIViewApp);