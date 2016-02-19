import React, {PropTypes} from 'react';
import MapStore from '../stores/MapStores';
import MapService from '../MarkerService';

const Marker = (props) => {
    const marker = MapService.createMarker(props.lat, props.lng);

    if (DG.ready) {
        let Map = MapStore.get();
        marker.addTo(Map);
    }

    return (
        <div id={props.id}></div>
    )
};

export default Marker
