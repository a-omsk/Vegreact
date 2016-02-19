import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import {get, post} from 'jquery';

const host = "https://laravel-joehill.rhcloud.com/api";

const UserService = {
    login(credentials) {

        const data = {
            email: credentials.username,
            password: credentials.password
        };

        post(`${host}/authenticate`, data).done((result) => {
            if (result.token) {
                UserActions.setToken(result.token);
            }
        });
    },

    getUser() {
        const token = UserStore.getToken();

        if (token) {
            get(`${host}/authenticate/user?token=${token}`).done((result) => {
                if (result.user) {
                    UserActions.setUser(result.user);
                }
            });
        }
    }
};

export default UserService;
