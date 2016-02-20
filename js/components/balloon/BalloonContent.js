import React, { PropTypes } from 'react';
import BallonButton from './BallonButton';
import AuthModal from '../common/AuthModal';
import UserStore from '../../stores/UserStore';

class BalloonContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: !!UserStore.currentUser,
            modalOpened: false
        };

        this.buttonAction = () => {
            if (this.state.isLogined) {
                console.log('Add location modal opened');
            } else {
                this.setState({modalOpened: true});
            }
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
                <AuthModal opened={this.state.modalOpened} />
            </div>
        )
    }
}

export default BalloonContent;
