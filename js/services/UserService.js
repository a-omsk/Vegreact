import Api from './Api';
import UserActions from '../actions/UserActions';

const UserService = {
    login({ username, password }) {
        const data = {
            email: username,
            password,
        };

        Api.post('auth/login', data).then(({ auth }) => {
            UserActions.setUser(auth);
            return Api.get('user/jwt');
        }).then(({ token }) => {
            if (token) {
                UserActions.setToken(token);
            }
        });
    },
};

export default UserService;
