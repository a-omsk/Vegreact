import React, { PropTypes } from 'react';

const cityStyle = {
    cursor: 'pointer'
};

const City = ({switchCity, code, name}) => {
    return <li style={cityStyle} onClick={switchCity(code)} style={{background: 'none'}} className="list-group-item">{name}</li>;
};

export default City
