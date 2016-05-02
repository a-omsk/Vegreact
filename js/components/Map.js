import React, { Component, PropTypes } from 'react';
import MarkerList from './MarkerList';
const mapStyle = {
    width: '100%',
    height: '100%'
};

export default class Map extends Component {
    static propTypes = {
        markers: PropTypes.shape({
            loaded: PropTypes.bool.isRequired,
            list: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    coordinates: PropTypes.string.isRequired
                })
            )
        })
    }

    render() {
        return (
            <div style={mapStyle} id="map">
                <MarkerList
                    loaded={this.props.markers.loaded}
                    list={this.props.markers.list}
                />
            </div>
        );
    }
}
