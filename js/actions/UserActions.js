import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const UserActions = {

    setToken(token) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_TOKEN,
            token,
        });
    },

    setUser(user) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_USER,
            user,
        });
    },
};

export default UserActions;
