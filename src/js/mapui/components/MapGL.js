import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";

import config from "../../../config.json";

const { accessToken, style } = config;
const containerStyle = {
    height: "80vh",
    width: "65vw"
};

module.exports = React.createClass({
    displayName: "MapGL",
    propTypes: {
        onBoundsChange: React.PropTypes.func,
        startPosition: React.PropTypes.object,
        markerText: React.PropTypes.string,
        markers: React.PropTypes.array
    },
    onMapMoveEnd: function(e){
        console.log(e);
        var bounds = e.target.getBounds();
        var northEast = { lat: bounds._northEast.lat, lng: bounds._northEast.lng };
        var southWest = { lat: bounds._southWest.lat, lng: bounds._southWest.lng };
        var newBounds = {
            NorthEast: northEast,
            SouthWest: southWest
        };
        if(this.props.onBoundsChange){
            this.props.onBoundsChange(newBounds);
        }

    },
    render: function () {
        var markerLayer;

        const position = [this.props.startPosition.longitude,this.props.startPosition.latitude];

        if(this.props.markers && this.props.markers.length > 0) {
            markerLayer = (
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}>
                    {
                        this.props.markers
                            .map((markerInfo, index) => (
                                <Feature
                                    key={markerInfo.display_name}
                                    coordinates={[parseFloat(markerInfo.lon),parseFloat(markerInfo.lat)]}/>
                            ))
                    }
                </Layer>
            );
        }

        return (
            <ReactMapboxGl
                style={style}
                center={position}
                minZoom={8}
                maxZoom={15}
                accessToken={accessToken}
                onMoveEnd={this.onMapMoveEnd}
                containerStyle={containerStyle}>
                {markerLayer}
            </ReactMapboxGl>
        );
    }
});