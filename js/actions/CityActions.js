import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const CityActions = {

    setCitiesList(cities) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_CITIES_LIST,
            cities: cities
        });
    },

    setCity(code) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_CITY,
            city: code
        });
    },

    resetCity() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RESET_CITY
        });
    }
};

export default CityActions;
