import React from 'react';
import LocationOverview from './LocationOverview';

const LocationList = (props) => {
    return <ul className="locations-list list-group">{props.list.map(location => {

        return  <LocationOverview key={location.id}
                                  id={location.id}
                                  markerId={location.marker_id}
                                  name={location.name}
                                  rating={location.rating}
                                  type={location.type}
                                  time={location.business_time}>
                </LocationOverview>
    })}</ul>
};

export default LocationList;
