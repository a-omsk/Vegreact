import React, { PropTypes } from 'react';

const BallonButton = (props) => {
    return (
        <div onClick={props.action} className="btn btn-default">{(props.isLogined) ? 'Добавить' : 'Войти' }</div>
    )
}

export default BallonButton;
