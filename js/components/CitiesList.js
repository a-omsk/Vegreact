import React from 'react'
import City from './City';

const CitiesList = ({ list, switchCity }) => {
    const listStyle = {
        padding: 0,
    };

    return (
        <ul style={listStyle}>
            { list.map(city => <City switchCity={switchCity} key={city.code} {...city} />) }
        </ul>
    );
};

CitiesList.propTypes = {
    list: React.PropTypes.array.isRequired,
    switchCity: React.PropTypes.func.isRequired,
};

export default CitiesList;
