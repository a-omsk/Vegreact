import React from  'react';
import MapStore from '../stores/MapStores';
import MapService from '../MapService';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        MapService.initMap();
    }

    render () {
        const mapStyle = {
            width: 100 + '%',
            height: 100 + '%'
        };

        return (
            <div style={mapStyle} id="map"></div>
        )
    }
};
