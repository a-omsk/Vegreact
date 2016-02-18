import React from 'react';
import Modal from 'react-modal';
import {find} from 'lodash';
import UserButton from './UserButton';
import CityButton from './CityButton';
import AuthForm from './AuthForm';
import UserStore from '../stores/UserStore';
import CityStore from '../stores/CityStore';

class Toolbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            city: CityStore.getCurrentCity(),
            user: UserStore.getCurrentUser(),
            showAuthModal: false
        }

        this.toggleModal = () => this.setState({showAuthModal: !this.state.showAuthModal});
        this.onUserChange = () => this.setState({user: getCurrentUser()});

        this.onCityChange = () => {
            const cityCode = CityStore.getCurrentCity();
            const citiesList = CityStore.getCitiesList();

            if (cityCode) {
                let city = find(citiesList, (city) => city.code === cityCode);
                if (city) { this.setState({city: city}); }
            } else {
                this.setState({city: ''});
            }
        }
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

        return <div style={toolbarStyle}>
                    <UserButton modalHandler={this.toggleModal.bind(this)} user={this.state.user} />
                    <CityButton city={this.state.city} />
                        <Modal
                          isOpen={this.state.showAuthModal}
                          style={modalStyle}
                          onRequestClose={this.toggleModal.bind(this)}
                        >

                          <AuthForm submit={this.toggleModal.bind(this)} />

                        </Modal>
               </div>
    }
}

export default Toolbar;
