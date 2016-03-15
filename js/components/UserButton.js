import React from 'react';

const UserButton = ({ user, modalHandler }) => {
    const buttonStyle = {
        marginRight: '5px',
    };

    return user ? (
        <div style={buttonStyle} className="btn btn-default">
            <span>{user.email}</span>
        </div>
    ) : (
        <div onClick={modalHandler} style={buttonStyle} className="btn btn-default">
            <span>Войти</span>
        </div>
    );
};

export default UserButton;
