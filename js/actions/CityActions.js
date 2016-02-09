import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const CityActions = {
    setCity(code) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_CITY,
            city: code
        });
    }
};

export default CityActions;
