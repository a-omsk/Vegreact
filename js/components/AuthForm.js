import React, { PropTypes } from 'react';
import Input from './common/Input';

const AuthForm = (props) => {
    return (
        <div>
            <Input
                inputType="email"
                name="username"
                placeholder="Имя пользователя"
                onChange={props.onChange}
                value={props.credentials.username}
                error={props.errors.username}
            />

            <Input
                inputType="password"
                name="password"
                placeholder="Пароль"
                onChange={props.onChange}
                value={props.credentials.pasword}
                error={props.errors.password}
            />

        <button className="btn btn-success btn-block" onClick={props.submit}>Войти</button>
        </div>
    )
};

export default AuthForm;
