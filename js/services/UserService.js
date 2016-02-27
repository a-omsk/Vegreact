import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import {get, post} from 'jquery';

const host = "https://laravel-joehill.rhcloud.com/api";

const UserService = {
    login({username, password}) {

        const data = {
            email: username,
            password: password
        };

        post(`${host}/authenticate`, data).done(({token}) => {
            if (token) {
                UserActions.setToken(token);
            }
        });
    },

    getUser() {
        const token = UserStore.token;

        if (token) {
            get(`${host}/authenticate/user?token=${token}`).done(({user}) => {
                if (user) {
                    UserActions.setUser(user);
                }
            });
        }
    }
};

export default UserService;
