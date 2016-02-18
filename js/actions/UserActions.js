import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const UserActions = {

    setToken(token) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_TOKEN,
            token: token
        });
    },

    setUser(userObj) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_USER,
            user: userObj
        });
    }
};

export default UserActions;
