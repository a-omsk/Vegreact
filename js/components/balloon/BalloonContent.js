import React, { PropTypes } from 'react';
import BallonButton from './BallonButton';
import UserStore from '../../stores/UserStore';

class BalloonContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: !!UserStore.currentUser
        };

        this.buttonAction = () => {
            if (this.state.isLogined) {
                console.log('Add location modal opened');
            } else {
                console.log('Auth modal opened');
            }
        };

        this.onUserChange = () => {
            this.setState({isLogined: !!UserStore.currentUser});
        }
    }

    componentDidMount() {
        UserStore.addListener('change', this.onUserChange);
    }

    render () {
        const content = this.state.isLogined ?
            (<div>Хотите добавить заведение в этом месте?</div>) :
            (<div>Для добавления заведения, пожалуйста, авторизуйтесь</div>);

        return (
            <div>
                {content}
                <BallonButton action={this.buttonAction.bind(this)} isLogined={this.state.isLogined} />
            </div>
        )
    }
}

export default BalloonContent;
