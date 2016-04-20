import React from 'react';
import Spinner from '../common/Spinner';
import BallonButton from './BallonButton';
import AuthModal from '../common/AuthModal';
import AddLocationModal from '../common/AddLocationModal';
import UserStore from '../../stores/UserStore';
import LocationStore from '../../stores/LocationStore';
import CityStore from '../../stores/CityStore';
import MapStore from '../../stores/MapStores';
import LocationService from '../../services/LocationService';
import extend from 'lodash/extend';

const ballonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

class BalloonContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: MapStore.selectedCoordinates,
            address: '',
            isLogined: !!UserStore.currentUser,
            authModalOpened: false,
            locationModalOpened: false,
        };

        this.toggleAuthButton = () => this.setState({ authModalOpened: !this.state.authModalOpened });
        this.toggleLocationButton = () => this.setState({ locationModalOpened: !this.state.locationModalOpened });
        this.onAddressChange = () => this.setState({ address: LocationStore.currentAddress });
        this.onUserChange = () => this.setState({ isLogined: !!UserStore.currentUser });

        this.saveLocation = (locationModel) => {
            const location = extend(locationModel, {
                city: CityStore.currentCity,
            });

            LocationService.postLocation(location);
        };

        this.buttonAction = () => {
            const stateBool = (this.state.isLogined) ? 'locationModalOpened' : 'authModalOpened';
            this.setState({ [stateBool]: true });
        };
    }

    componentWillMount() {
        UserStore.addListener('change', this.onUserChange);
        LocationStore.addListener('addressSets', this.onAddressChange);
    }

    componentDidMount() {
        // Native click handler via props not fired. The temporary solution wrote below
        setTimeout(() => {
            const button = document.querySelector('.ballon-button');
            button.addEventListener('click', this.buttonAction);
        });
    }

    componentWillUmount() {
        UserStore.removeListener('change', this.onUserChange);
        LocationStore.removeListener('addressSets', this.onAddressChange);
    }

    render() {
        const content = this.state.isLogined ?
            (<div>
                <h4 style={{ textAlign: 'center' }}>{ this.state.address || <Spinner /> }</h4>
                <div>{this.props.origin === 'marker' ? 'Добавить еще одно'  : 'Хотите добавить'} заведение в этом месте?</div>
            </div>) :

            (<div>Для добавления заведения, пожалуйста, авторизуйтесь</div>);

        return (
            <div style={ballonStyle}>
                {content}
                <BallonButton
                  action={this.buttonAction}
                  isLogined={this.state.isLogined}
                />

                <AuthModal
                  closeHandler={this.toggleAuthButton}
                  opened={this.state.authModalOpened}
                />

                <AddLocationModal
                  closeHandler={this.toggleLocationButton}
                  submitAction={this.saveLocation}
                  opened={this.state.locationModalOpened}
                  coordinates={this.state.coordinates}
                />
            </div>
        );
    }
}

export default BalloonContent;
