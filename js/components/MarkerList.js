import React, {PropTypes} from 'react';
import Marker from './Marker';
import MarkerStore from '../stores/MarkerStore';
import MarkerActions from '../actions/MarkerActions';
import {last} from 'lodash';

const MarkerList = (props) => {
    return  <div>{ (MarkerStore.loaded) ? null :
                    props.list.map((marker, index) => {
                        let [lat, lng] = marker.coordinates.split(', ');
                        if (index === props.list.length - 1) { setTimeout(MarkerActions.fixMarkers) }
                        return <Marker key={marker.id} id={marker.id} lat={lat} lng={lng} />
                    })
            }</div>
};
export default MarkerList;
