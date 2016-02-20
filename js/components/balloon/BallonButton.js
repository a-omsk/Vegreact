import React, { PropTypes } from 'react';

const BallonButton = (props) => {

    return (
        <div onClick={props.action} className="ballon-button btn btn-default">
            <span>{(props.isLogined) ? 'Добавить' : 'Войти' }</span>
        </div>
    )
};

export default BallonButton;
