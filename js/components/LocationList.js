import React from 'react';
import NoLocations from 'NoLocations';
import LocationOverview from './LocationOverview';
import MarkerService from 'MarkerService';

const LocationList = ({ list, coordinates }) => {

    if (!list.length) {
        return <NoLocations />;
    }

    return (
        <ul className="locations-list list-group">{list.map(location => {
            const { id, marker_id, name, rating, type, business_time } = location;
            const marker = MarkerService.getMarkerById(location.marker_id);
            const [lat, lng] = marker ? marker.coordinates.split(', ') : [];

            return (
                <LocationOverview
                  key={id}
                  id={id}
                  markerId={marker_id}
                  position={coordinates}
                  lat={lat && parseFloat(lat)}
                  lng={lng && parseFloat(lng)}
                  name={name}
                  rating={rating}
                  type={type}
                  time={business_time}
                />
            );
        })}</ul>
    );
}

LocationList.propTypes = {
    list: React.PropTypes.array.isRequired,
    coordinates: React.PropTypes.object
};

export default LocationList;
