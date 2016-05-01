import React from 'react';
import MapStore from '../stores/MapStores';
import MapService from '../MarkerService';

const Marker = ({ id, lat, lng }) => {
    const marker = MapService.createMarker(id, lat, lng);
    const Map = MapStore.get;
    marker.addTo(Map);

    return (<div id={id} />);
};

Marker.propTypes = {
    id: React.PropTypes.number.isRequired,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired
};

export default Marker;
