import React, {PropTypes} from 'react';
import Marker from './Marker';

const MarkerList = (props) => {

    return  <div>{
                props.list.map((marker) => {
                    let [lat, lng] = marker.coordinates.split(', ');
                    return <Marker key={marker.id} lat={lat} lng={lng}></Marker>})
                }</div>
}
export default MarkerList;
