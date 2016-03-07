import React from 'react';
import Rater from 'react-rater';
import CityStore from '../stores/CityStore';
import Haversine from './common/Haversine';
import { Link } from 'react-router';

const firstRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
};

const distanceStyle = {
    color: '#5F5F5F',
    paddingTop: '10px',
    fontSize: '12px',
};

const haversineHelper = {
    km: 'км.',
    m: 'м.',
};

const LocationOverview = ({ id, markerId, name, type, time, rating, lat, lng, position }) => {
    const city = CityStore.currentCity;
    const hasCoordinates = !!(lat && lng && position && position.lat && position.lng);

    const haversine = (hasCoordinates) ? (
        <Haversine
          originLat={position.lat}
          originLng={position.lng}
          targetLat={lat}
          targetLng={lng}
          style={distanceStyle}
          units={'auto'}
          helper={haversineHelper}
        />
    ) : null;

    return (
        <li style={{ background: 'none' }} className="list-group-item">
            <div style={firstRowStyle}>
                <Link to={{ pathname: `/locations/${city}/${markerId}`, query: { id } }}>
                    <h4>{name}</h4>
                </Link>
                {haversine}
            </div>
            <div>{type}</div>
            <div>{time}</div>
            <Rater style={{ pointerEvents: 'none' }} total={rating} rating={rating} />
        </li>
      );
};

LocationOverview.propTypes = {
    id: React.PropTypes.number.isRequired,
    markerId: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    time: React.PropTypes.string.isRequired,
    rating: React.PropTypes.number.isRequired,
    lat: React.PropTypes.number,
    lng: React.PropTypes.number,
    position: React.PropTypes.object,
};

export default LocationOverview;
