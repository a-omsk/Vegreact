import React, { PropTypes } from 'react';
import BallonButton from './BallonButton';
import AuthModal from '../common/AuthModal';
import AddLocationModal from '../common/AddLocationModal'
import UserStore from '../../stores/UserStore';

class BalloonContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: !!UserStore.currentUser,
            authModalOpened: false,
            locationModalOpened: false
        };

        this.toggleAuthButton = () => this.setState({authModalOpened: !this.state.authModalOpened});
        this.toggleLocationButton = () => this.setState({locationModalOpened: !this.state.locationModalOpened});

        this.buttonAction = () => {
            const stateBool = (this.state.isLogined) ? 'locationModalOpened' : 'authModalOpened';
            this.setState({[stateBool]: true});
        };

        this.onUserChange = () => {
            this.setState({isLogined: !!UserStore.currentUser});
        }
    }

    componentWillUmount() {
        UserStore.removeListener('change', this.onUserChange);
    }

    componentDidMount() {
        UserStore.addListener('change', this.onUserChange);

        // Native click handler via props not fired. The temporary solution wrote below
        setTimeout(()=>{
            const button = document.querySelector('.ballon-button');
            button.addEventListener('click', this.buttonAction);
        });
    }

    render () {
        const content = this.state.isLogined ?
            (<div>Хотите добавить заведение в этом месте?</div>) :
            (<div>Для добавления заведения, пожалуйста, авторизуйтесь</div>);

        return (
            <div>
                {content}
                <BallonButton action={this.buttonAction.bind(this)} isLogined={this.state.isLogined} />
                <AuthModal closeHandler={this.toggleAuthButton.bind(this)} opened={this.state.authModalOpened} />
                <AddLocationModal closeHandler={this.toggleLocationButton.bind(this)} opened={this.state.locationModalOpened} />
            </div>
        )
    }
}

export default BalloonContent;
