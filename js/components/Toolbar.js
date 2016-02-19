import React from 'react';
import Modal from 'react-modal';
import {find} from 'lodash';
import UserButton from './UserButton';
import CityButton from './CityButton';
import AuthForm from './AuthForm';
import UserStore from '../stores/UserStore';
import CityStore from '../stores/CityStore';
import UserService from '../services/UserService';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: CityStore.getCurrentCity(),
            user: UserStore.getCurrentUser(),
            credentials: {},
            loginErrors: {},
            showAuthModal: false
        };

        this.toggleModal = () => this.setState({showAuthModal: !this.state.showAuthModal});

        this.onUserChange = () => {
            if (!UserStore.getCurrentUser()) {
                UserService.getUser();
            } else {
                this.setState({user: UserStore.getCurrentUser()});
            }
        };

        this.onLoginModelChange = (e) => {
            const field = e.target.name;
            const value = e.target.value;

            this.state.credentials[field] = value;
            this.setState({credentials: this.state.credentials});
        };

        this.onCityChange = () => {
            const cityCode = CityStore.getCurrentCity();
            const citiesList = CityStore.getCitiesList();

            if (cityCode) {
                let city = find(citiesList, (city) => city.code === cityCode);
                if (city) { this.setState({city: city}); }
            } else {
                this.setState({city: ''});
            }
        };

        this.isFormValid = () => {
            const credentials = this.state.credentials;
            const errors = {};

            if (!credentials.username.length) {
                errors.username = 'Введите Ваш логин';
            }

            if (!credentials.password.length) {
                errors.password = 'Введите Ваш пароль';
            }

            this.setState({loginErrors: errors});
            return !Object.keys(errors).length;
        };

        this.login = () => {
            if (this.isFormValid()) {
                UserService.login(this.state.credentials);
                this.toggleModal();
                this.setState({credentials: {}});
            }
        };
    }

    componentWillMount() {
        UserStore.addListener('change', this.onUserChange);
        CityStore.addListener('change', this.onCityChange);
    }

    render () {
        const toolbarStyle = {
            position: 'absolute',
            right: 10 + 'px',
            top: 10 + 'px',
            zIndex: 1
        };

        const modalStyle = {
            overlay : {
                zIndex: 10,
            },

            content : {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40 + '%',
                width: 40 + '%',
                margin: 'auto'
            }
        };

        return (<div style={toolbarStyle}>
                    <UserButton modalHandler={this.toggleModal.bind(this)} user={this.state.user} />
                    <CityButton city={this.state.city} />
                        <Modal
                          isOpen={this.state.showAuthModal}
                          style={modalStyle}
                          onRequestClose={this.toggleModal.bind(this)} >

                          <AuthForm
                              onChange={this.onLoginModelChange.bind(this)}
                              submit={this.login.bind(this)}
                              credentials={this.state.credentials}
                              errors={this.state.loginErrors} />
                        </Modal>
               </div>);
    }
}

export default Toolbar;
