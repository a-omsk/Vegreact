import React, { PropTypes } from 'react'
import City from './City';

const CitiesList = (props) => {

    const listStyle = {
        padding: 0,
        overflow: 'auto',
        height: window.innerHeight + 'px'
    }

    return (
        <ul style={listStyle}>
            { props.list.map(city => <City key={city.code} {...city} />) }
        </ul>
    )
}

export default CitiesList;
