import React, {PropTypes} from 'react';
import MapStore from '../stores/MapStores';
import MapService from '../MarkerService';

export default class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.marker = {};
    }

    render() {
        this.marker = MapService.createMarker(this.props.lat, this.props.lng);

        if (DG.ready) {
            let Map = MapStore.get();
            this.marker.addTo(Map);
        }

        return (
            <div></div>
        )
    }
}

export default Marker
