import React, { PropTypes } from 'react'

const AuthForm = (props) => {
    return (
        <div>
            <div>Login form</div>
            <button onClick={props.submit}>Войти</button>
        </div>
    )
}

export default AuthForm;
