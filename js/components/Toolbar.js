import React from 'react';
import { find } from 'lodash';
import UserButton from './UserButton';
import CityButton from './CityButton';
import AuthModal from './common/AuthModal';
import UserStore from '../stores/UserStore';
import CityStore from '../stores/CityStore';
import UserService from '../services/UserService';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: CityStore.currentCity,
            user: UserStore.currentUser,
            showAuthModal: false,
        };

        this.toggleModal = () => this.setState({ showAuthModal: !this.state.showAuthModal });

        this.onUserChange = () => {
            if (!UserStore.currentUser) {
                UserService.getUser();
            } else {
                this.setState({ user: UserStore.currentUser });

                if (this.state.showAuthModal) {
                    this.setState({ showAuthModal: false });
                }
            }
        };

        this.onCityChange = () => {
            const cityCode = CityStore.currentCity;
            const citiesList = CityStore.citiesList;

            if (cityCode) {
                const city = find(citiesList, (newCity) => newCity.code === cityCode);
                if (city) { this.setState({ city }); }
            } else {
                this.setState({ city: '' });
            }
        };
    }

    componentWillMount() {
        UserStore.addListener('change', this.onUserChange);
        CityStore.addListener('change', this.onCityChange);
    }

    componentWillUnmount() {
        UserStore.removeListener('change', this.onUserChange);
        CityStore.removeListener('change', this.onCityChange);
    }

    render() {
        const toolbarStyle = {
            position: 'absolute',
            right: '10px',
            top: '10px',
            zIndex: 1,
        };

        return (
            <div style={toolbarStyle}>
                <UserButton
                  modalHandler={this.toggleModal.bind(this)}
                  user={this.state.user}
                />
                <CityButton city={this.state.city} />
                <AuthModal
                  closeHandler={this.toggleModal.bind(this)}
                  opened={this.state.showAuthModal}
                />
               </div>);
    }
}

export default Toolbar;
