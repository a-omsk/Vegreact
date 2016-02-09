import React, {PropTypes} from 'react';
import MapStore from '../stores/MapStores';
import MapService from '../MarkerService';
import Marker from './Marker';

export default class MarkerList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.markers = this.props.markers;
    }

    render() {
        return (
            <div>{this.props.list.map((marker) => {
                let [lat, lng] = marker.coordinates.split(', ');

                return (
                    <Marker key={marker.id} lat={lat} lng={lng}></Marker>
                );
            }, this)}</div>
        )
    }
}

export default MarkerList
