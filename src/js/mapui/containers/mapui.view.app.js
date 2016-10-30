var React = require("react");
var connect = require("react-redux").connect;
var MapUIActionCreators = require("../actions/mapui.action_creators.js");
var Header = require("../../components/layout/hero.header");
var Footer = require("../../components/layout/footer");
var MediumInput = require("../../components/form/medium.input");
var MediaDetailed = require("../../components/media/media.detailed");
var TitledMessage = require("../../components/message/titled.message");
var MapUIView = require("../components/MapGL");

var MapUIViewApp = React.createClass({
    displayName: "MapUIViewApp",
    propTypes: {
        aoiUpdate: React.PropTypes.func,
        centerPosition: React.PropTypes.object,
        isFetching: React.PropTypes.bool,
        search: React.PropTypes.string,
        pointsOfInterest: React.PropTypes.array,
        selectedMarker: React.PropTypes.object
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

        const header = (
            <Header title={"Demo Map with React & Leaflet"}>
            </Header>
        );

        var sideBar;
        if(this.props.pointsOfInterest.length > 0) {
            sideBar = this.props.pointsOfInterest.map(interestPoint => {
                    var isSelected = this.props.selectedMarker !== null &&
                        interestPoint.display_name === this.props.selectedMarker.display_name;
                    return (
                        <MediaDetailed key={interestPoint.display_name}
                                       mediaDetails={interestPoint}
                                       selected={isSelected}
                                       onSelected={this.props.selectMarker}
                            />
                    );
                }
            );
        } else {
            sideBar = (
                <TitledMessage
                    title={"Placename Search Using OpenStreetMap.org Nominatim Service"}
                    text={"Enter a search term above to find places that match. (ie. 'kalamazoo')."}
                    classname={"is-info"} />
            );
        }

        const mapUI = (
            <MapUIView onBoundsChange={this.props.aoiUpdate}
                       startPosition={this.props.centerPosition}
                       markers={this.props.pointsOfInterest}
                       markerText={this.props.search}>
            </MapUIView>
        );

        const contentGrid = (
            <div className="columns">
                <div className="column auto">
                    {sideBar}
                </div>
                <div className="column is-two-thirds">
                    {mapUI}
                </div>
            </div>
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
                    {contentGrid}
                </div>
                {footer}
            </div>
        );
    }
});

var mapStateToProps = function(state) {
    return {
        centerPosition: state.mapMarkers.center,
        isFetching: state.mapMarkers.isFetching,
        search: state.mapMarkers.search,
        pointsOfInterest: state.mapMarkers.searchResults,
        selectedMarker: state.mapMarkers.selectedMarker
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
        },
        selectMarker: function(data){
            dispatch(MapUIActionCreators.selectMarker(data));
        }
    }
};

module.exports = connect(mapStateToProps,mapDispatchToProps)(MapUIViewApp);