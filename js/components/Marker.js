import React, {PropTypes} from 'react';
import MapStore from '../stores/MapStores';
import MapService from '../MarkerService';

const Marker = ({id, lat, lng}) => {
    const marker = MapService.createMarker(lat, lng);

    if (DG.ready) {
        let Map = MapStore.get;
        marker.addTo(Map);
    }

    return (
        <div id={id}></div>
    )
};

export default Marker
