import React from 'react';
import Marker from './Marker';
import MarkerStore from '../stores/MarkerStore';
import MarkerActions from '../actions/MarkerActions';

const MarkerList = ({ list }) => (
    <div>{ (MarkerStore.loaded) ? null :
        list.map(({ id, lat, lng }, index) => {
            if (index === list.length - 1) { setTimeout(MarkerActions.fixMarkers); }

            return (
                <Marker
                  key={id}
                  id={id}
                  lat={lat && parseFloat(lat)}
                  lng={lng && parseFloat(lng)}
                />);
        })
    }</div>);

MarkerList.propTypes = {
    list: React.PropTypes.array.isRequired,
};

export default MarkerList;
