import React, { PropTypes } from 'react'

const CitiesList = (props) => {
    return (
        <ul style={{padding: 0, overflow: 'auto'}}>
            { props.list.map(city => <li key={city.code} className="list-group-item">{city.name}</li>) }
        </ul>
    )
}

export default CitiesList;
