import React, { PropTypes } from 'react'
import City from './City';

const CitiesList = (props) => {

    const listStyle = {
        padding: 0
    };

    return (
        <ul style={listStyle}>
            { props.list.map(city => <City switchCity={props.switchCity} key={city.code} {...city} />) }
        </ul>
    )
};

export default CitiesList;
