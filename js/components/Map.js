import React, { Component } from 'react';
import MarkerList from './MarkerList';
const mapStyle = {
    width: '100%',
    height: '100%'
};

export default class Map extends Component {
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
