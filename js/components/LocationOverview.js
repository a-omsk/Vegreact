import React from 'react';
import Rater from 'react-rater';
import CityStore from '../stores/CityStore';
import { Link } from 'react-router';

const LocationOverview = ({ id, markerId, name, type, time, rating }) => {
    const city = CityStore.currentCity;

    return (
        <li style={{ background: 'none' }} className="list-group-item">
            <Link to={{ pathname: `/locations/${city}/${markerId}`, query: { id } }}>
                <h4>{name}</h4>
            </Link>
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
};

export default LocationOverview;
