import React from 'react';
import LocationOverview from './LocationOverview';
import MarkerStore from '../stores/MarkerStore';

const LocationList = ({ list, coordinates }) => (
      <ul className="locations-list list-group">{list.map(location => {
          const { id, markerId, name, rating, type, businessTime } = location;
          const marker = MarkerStore.getMarkerById(location.markerId);

          const { lat, lng } = marker || {};

          return (
            <LocationOverview
              key={id}
              id={id}
              markerId={markerId}
              position={coordinates}
              lat={lat && parseFloat(lat)}
              lng={lng && parseFloat(lng)}
              name={name}
              rating={rating}
              type={type}
              time={businessTime}
            />
          );
      })}</ul>
    );

LocationList.propTypes = {
    list: React.PropTypes.array.isRequired,
    coordinates: React.PropTypes.object,
};

export default LocationList;
