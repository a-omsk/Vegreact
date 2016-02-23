import React, { PropTypes } from 'react';

const cityStyle = {
    cursor: 'pointer'
};

const City = (props) => {
    return <li style={cityStyle} onClick={props.switchCity(props.code)} style={{background: 'none'}} className="list-group-item">{props.name}</li>;
};

export default City
