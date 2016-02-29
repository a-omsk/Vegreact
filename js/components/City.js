import React from 'react';

const cityStyle = {
    cursor: 'pointer',
    background: 'none',
};

const City = ({ switchCity, code, name }) => {
    return (
        <li style={cityStyle}
          onClick={switchCity(code)}
          className="list-group-item"
        >{name}
        </li>
    );
};

City.propTypes = {
    switchCity: React.PropTypes.func.isRequired,
    code: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
};

export default City;
