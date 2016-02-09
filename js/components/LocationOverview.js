import React from 'react';
import Rater from 'react-rater';

const LocationOverview = (props) => {

    return <li style={{background: 'none'}} className="list-group-item">
                <h4>{props.name}</h4>
                <div>{props.type}</div>
                <div>{props.time}</div>
                <Rater style={{pointerEvents: 'none'}} total={props.rating} rating={props.rating} />
          </li>;
}
export default LocationOverview;
