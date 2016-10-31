var React = require("react");
var connect = require("react-redux").connect;
var MapUIActionCreators = require("../actions/mapui.action_creators.js");
var Header = require("../../components/layout/hero.header");
var Footer = require("../../components/layout/footer");
var MediumInput = require("../../components/form/medium.input");
var MediaDetailed = require("../../components/media/media.detailed");
var TitledMessage = require("../../components/message/titled.message");
var MapUIView = require("../components/MapUI");
var MapGLUIView = require("../components/MapGL");
var MapModeToggle = require("../../components/form/button.toggle");

var MapUIViewApp = React.createClass({
    displayName: "MapUIViewApp",
    propTypes: {
        aoiUpdate: React.PropTypes.func,
        centerPosition: React.PropTypes.object,
        isFetching: React.PropTypes.bool,
        search: React.PropTypes.string,
        pointsOfInterest: React.PropTypes.array,
        selectedMarker: React.PropTypes.object,
        mapType: React.PropTypes.string
    },

    componentDidMount: function() {

    },

    searchFunc: function(data){
        this.props.executeSearch(data);
    },

    clearSearch: function(){
        this.props.clearSearch();
    },

    render: function() {
        const mapDivStyle = {
            margin: "10px"
        };

        var locationSelect = (
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
        var clearResultsButton;
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
            clearResultsButton = (
                <a className="button is-danger" onClick={this.searchFunc}>
                    <span>Clear Results</span>
                    <span className="icon">
                        <i className="fa fa-times"></i>
                    </span>
                </a>
            );

        } else {
            sideBar = (
                <TitledMessage
                    title={"Placename Search Using OpenStreetMap.org Nominatim Service"}
                    text={"Enter a search term above to find places that match. (ie. 'kalamazoo')."}
                    classname={"is-info"} />
            );
        }

        var mapUI;
        if(this.props.mapType === "Default"){
            mapUI = (
                <MapUIView onBoundsChange={this.props.aoiUpdate}
                           startPosition={this.props.centerPosition}
                           markers={this.props.pointsOfInterest}
                           markerText={this.props.search}>
                </MapUIView>
            );
        } else {
            mapUI = (
                <MapGLUIView onBoundsChange={this.props.aoiUpdate}
                             startPosition={this.props.centerPosition}
                             markers={this.props.pointsOfInterest}
                             markerText={this.props.search}>
                </MapGLUIView>
            );
        }

        const mapModeToggle = (
            <MapModeToggle buttonOneText={"Default"}
                           buttonTwoText={"Mapbox GL View"}
                           selectedButtonText={this.props.mapType}
                           onToggle={this.props.setMapType}>
            </MapModeToggle>
        )
        const contentGrid = (
            <div className="columns">
                <div className="column auto">
                    {clearResultsButton}
                    {sideBar}
                    {mapModeToggle}
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
        selectedMarker: state.mapMarkers.selectedMarker,
        mapType: state.mapView.mapType
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
        },
        setMapType: function(data){
            dispatch(MapUIActionCreators.setMapType(data));
        },
        clearSearch: function(){
            dispatch(MapUIActionCreators.clearSearch());
        }
    }
};

module.exports = connect(mapStateToProps,mapDispatchToProps)(MapUIViewApp);