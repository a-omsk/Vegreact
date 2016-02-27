import React, { PropTypes } from 'react'
import City from './City';

const CitiesList = ({list, switchCity}) => {

    const listStyle = {
        padding: 0
    };

    return (
        <ul style={listStyle}>
            { list.map(city => <City switchCity={switchCity} key={city.code} {...city} />) }
        </ul>
    )
};

export default CitiesList;
