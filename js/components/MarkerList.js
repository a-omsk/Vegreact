import React from 'react';
import Marker from './Marker';
import MarkerStore from '../stores/MarkerStore';
import MarkerActions from '../actions/MarkerActions';

const MarkerList = ({ list }) => (
    <div>{ (MarkerStore.loaded) ? null :
        list.map((marker, index) => {
            const [lat, lng] = marker.coordinates.split(', ');
            if (index === list.length - 1) { setTimeout(MarkerActions.fixMarkers); }

            return (
                <Marker
                  key={marker.id}
                  id={marker.id}
                  lat={lat && parseFloat(lat)}
                  lng={lng && parseFloat(lng)}
                />);
        })
    }</div>);

MarkerList.propTypes = {
    list: React.PropTypes.array.isRequired,
};

export default MarkerList;
