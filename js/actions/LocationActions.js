import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const LocationActions = {
    saveLocations(locations) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_LOCATIONS,
            locations: locations
        });
    },

    resetLocations() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RESET_LOCATIONS
        });
    },

    setCurrentLocation(location) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_CURRENT_LOCATION,
            location: location
        });
    }
};

export default LocationActions;
