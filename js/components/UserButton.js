import React, { PropTypes } from 'react'

const UserButton = ({user, modalHandler}) => {

    const buttonStyle = {
        marginRight: 5 + 'px'
    };

    return user ? (
        <div style={buttonStyle} className="btn btn-default">
            <span>{user.name}</span>
        </div>
    ) : (
        <div onClick={modalHandler} style={buttonStyle} className="btn btn-default">
            <span>Войти</span>
        </div>
    )
};

export default UserButton;
