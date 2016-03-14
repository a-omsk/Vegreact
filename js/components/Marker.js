import React from 'react';
import MapStore from '../stores/MapStores';
import MapService from '../MarkerService';

const Marker = ({ id, lat, lng }) => {
    const marker = MapService.createMarker(id, lat, lng);

    if (DG.ready) {
        const Map = MapStore.get;
        marker.addTo(Map);
    }

    return (<div id={id} />);
};

Marker.propTypes = {
    id: React.PropTypes.oneOfType([
        React.PropTypes.string.isRequired,
        React.PropTypes.number.isRequired,
    ]),
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
};

export default Marker;
