import React from 'react';
import Rater from 'react-rater';
import CityStore from '../stores/CityStore';
import {Link} from 'react-router';

const LocationOverview = (props) => {

    return <li style={{background: 'none'}} className="list-group-item">
                <Link to={{pathname: `/locations/${CityStore.getCurrentCity()}/${props.markerId}`, query: { id: props.id }}}><h4>{props.name}</h4></Link>
                <div>{props.type}</div>
                <div>{props.time}</div>
                <Rater style={{pointerEvents: 'none'}} total={props.rating} rating={props.rating} />
          </li>;
};

export default LocationOverview;
