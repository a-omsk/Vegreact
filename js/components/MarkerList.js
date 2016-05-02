import React, { Component, PropTypes } from 'react';
import { ready } from 'map';
import Marker from 'Marker';

export default class MarkerList extends Component {
    static propTypes = {
        loaded: PropTypes.bool.isRequired,
        list: PropTypes.array.isRequired
    }

    shouldComponentUpdate() {
        return ready();
    }

    render() {
        return (
            <div>{ this.props.list.map(marker => {
                const [lat, lng] = marker.coordinates.split(', ');
                return (
                    <Marker
                      key={marker.id}
                      id={marker.id}
                      lat={lat && parseFloat(lat)}
                      lng={lng && parseFloat(lng)}
                    />
                );
            })
            }</div>
        );
    }
}
