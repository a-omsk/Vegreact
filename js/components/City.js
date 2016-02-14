import React, { PropTypes } from 'react'

const City = (props) => {
    return <li style={{background: 'none'}} className="list-group-item">{props.name}</li>;
}

export default City
