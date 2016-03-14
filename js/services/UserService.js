import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import { get, post } from 'jquery';

const host = 'http://localhost:1337';

const UserService = {
    login({ username, password }) {
        const data = {
            email: username,
            password,
        };

        post(`${host}/auth/login`, data).done(({ token }) => {
            if (token) {
                UserActions.setToken(token);
            }
        });
    },

    getUser() {
        const token = UserStore.token;

        if (token) {
            get(`${host}/authenticate/user?token=${token}`).done(({ user }) => {
                if (user) {
                    UserActions.setUser(user);
                }
            });
        }
    },
};

export default UserService;
