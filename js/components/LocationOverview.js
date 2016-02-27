import React from 'react';
import Rater from 'react-rater';
import CityStore from '../stores/CityStore';
import {Link} from 'react-router';

const LocationOverview = ({id, markerId, name, type, time, rating}) => {

    return <li style={{background: 'none'}} className="list-group-item">
                <Link to={{pathname: `/locations/${CityStore.currentCity}/${markerId}`, query: { id: id }}}><h4>{name}</h4></Link>
                <div>{type}</div>
                <div>{time}</div>
                <Rater style={{pointerEvents: 'none'}} total={rating} rating={rating} />
          </li>;
};

export default LocationOverview;
