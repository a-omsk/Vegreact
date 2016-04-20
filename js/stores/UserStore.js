import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import cloneDeep from 'lodash/cloneDeep';
import { EventEmitter } from 'events';

let _user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
let _token = localStorage.getItem('token') || null;

class UserStore extends EventEmitter {
    constructor(props) {
        super(props);

        const setToken = ({ token }) => () => {
            _token = token;
            localStorage.setItem('token', _token);
            this.emit('change');
        };

        const setUser = ({ user }) => () => {
            _user = user;
            localStorage.setItem('user', JSON.stringify(_user));
            this.emit('change');
        };

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SET_TOKEN]: setToken(action),
                [ActionTypes.SET_USER]: setUser(action),
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
            }
        });
    }

    get token() {
        return _token;
    }

    get currentUser() {
        return cloneDeep(_user);
    }
}

export default new UserStore;
