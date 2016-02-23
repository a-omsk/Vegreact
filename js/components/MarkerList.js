import React, {PropTypes} from 'react';
import Marker from './Marker';
import {last} from 'lodash';

const MarkerList = (props) => {
    return  <div>{
                props.list.map((marker) => {
                    let [lat, lng] = marker.coordinates.split(', ');
                    return <Marker key={marker.id} id={marker.id} lat={lat} lng={lng} />})
                }
            </div>
};
export default MarkerList;
