import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

module.exports = React.createClass({
    displayName: "MapUI",
    propTypes: {
        onBoundsChange: React.PropTypes.func
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
        const position = [51.505, -0.09];
        const map = (
            <Map center={position} zoom={13} onMoveend={this.onMapMoveEnd}>
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
            </Map>
        );

        return map;
    }
});