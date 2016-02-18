import React, { PropTypes } from 'react'

const UserButton = (props) => {

    const buttonStyle = {
        marginRight: 5 + 'px'
    };

    return props.user ? (
        <div style={buttonStyle} className="btn btn-default">
            <span>Joe Hill</span>
        </div>
    ) : (
        <div onClick={props.modalHandler} style={buttonStyle} className="btn btn-default">
            <span>Войти</span>
        </div>
    )
}

export default UserButton;
