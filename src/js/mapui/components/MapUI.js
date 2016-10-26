import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

module.exports = React.createClass({
    displayName: "MapUI",
    propTypes: {
        onBoundsChange: React.PropTypes.func,
        startPosition: React.PropTypes.object,
        markerText: React.PropTypes.string,
        markers: React.PropTypes.array
    },
    onMapMoveEnd: function(e){
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

        const position = [this.props.startPosition.latitude, this.props.startPosition.longitude];

        const mapMarkers = this.props.markers.map(markerInfo => {
            var markerPos = [parseFloat(markerInfo.lat), parseFloat(markerInfo.lon)];

            return (
                <Marker key={markerInfo.display_name}
                        position={markerPos}>
                    <Popup>
                        <span>{markerInfo.display_name}</span>
                    </Popup>
                </Marker>
            )
        });

        return (
            <Map center={position} zoom={10} onMoveend={this.onMapMoveEnd}>
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                {mapMarkers}
            </Map>
        );
    }
});