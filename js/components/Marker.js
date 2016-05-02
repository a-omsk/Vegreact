import React, { PropTypes } from 'react';
import { getInstance } from 'map';
import MapService from '../MarkerService';

const Marker = ({ id, lat, lng }) => {
    const marker = MapService.createMarker(id, lat, lng);
    const Map = getInstance();

    return marker.addTo(Map.instance) && <div id={id} />;
};

Marker.propTypes = {
    id: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
};

export default Marker;
