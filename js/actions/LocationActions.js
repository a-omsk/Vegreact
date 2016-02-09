import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const LocationActions = {
    saveLocations(locations) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_LOCATIONS,
            locations: locations
        });
    }
};

export default LocationActions;
