import React from 'react';
import Input from './common/Input';

const AuthForm = ({ onChange, credentials, errors, submit }) => (
    <div>
        <Input
          inputType="email"
          name="username"
          placeholder="Имя пользователя"
          onChange={onChange}
          value={credentials.username}
          error={errors.username}
        />

        <Input
          inputType="password"
          name="password"
          placeholder="Пароль"
          onChange={onChange}
          value={credentials.pasword}
          error={errors.password}
        />

    <button className="btn btn-success btn-block" onClick={submit}>Войти</button>
    </div>
);

AuthForm.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    credentials: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object.isRequired,
};

export default AuthForm;
