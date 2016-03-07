import React from 'react';
import Modal from 'react-modal';
import AuthForm from '../AuthForm';
import UserService from '../../services/UserService';

const modalStyle = {
    overlay: {
        zIndex: 10,
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%',
        width: '40%',
        margin: 'auto',
    },
};

class AuthModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAuthModal: props.opened,
            credentials: {
                username: '',
                password: ''
            },
            loginErrors: {}
        };

        this.onLoginModelChange = ({ target: { name, value } }) => {
            this.state.credentials[name] = value;
            this.setState({ credentials: this.state.credentials });
        };

        this.isFormValid = () => {
            const { credentials } = this.state;
            const errors = {};

            if (!credentials.username.length) { errors.username = 'Введите Ваш логин'; }
            if (!credentials.password.length) { errors.password = 'Введите Ваш пароль'; }

            this.setState({ loginErrors: errors });
            return !Object.keys(errors).length;
        };

        this.login = () => {
            if (this.isFormValid()) {
                UserService.login(this.state.credentials);
                props.closeHandler();
                this.setState({ credentials: {} });
            }
        };
    }

    render() {
        return (
            <Modal
              isOpen={this.props.opened}
              style={modalStyle}
              onRequestClose={this.props.closeHandler} >

              <AuthForm
                onChange={this.onLoginModelChange.bind(this)}
                submit={this.login.bind(this)}
                credentials={this.state.credentials}
                errors={this.state.loginErrors}
              />
            </Modal>
        );
    }
}

export default AuthModal;
