import React from 'react';
import LocationOverview from './LocationOverview';

const LocationList = ({ list }) => {
    return (
      <ul className="locations-list list-group">{list.map(location => {
          const { id, marker_id, name, rating, type, business_time } = location;

          return (
            <LocationOverview
              key={id}
              id={id}
              markerId={marker_id}
              name={name}
              rating={rating}
              type={type}
              time={business_time}
            />
          );
      })}</ul>
    );
};

LocationList.propTypes = {
    list: React.PropTypes.array.isRequired,
};

export default LocationList;
