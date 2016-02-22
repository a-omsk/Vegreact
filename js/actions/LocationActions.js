import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const LocationActions = {
    saveLocations(locations) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_LOCATIONS,
            locations: locations
        });
    },

    pushLocation(locations) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.PUSH_LOCATIONS,
            locations: locations
        });
    },

    resetLocations() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RESET_LOCATIONS
        });
    },

    setCurrentGroup(group) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_CURRENT_LOCATION,
            group: group
        });
    },

    blockLoading() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.BLOCK_LOADING
        });
    },

    setCurrentAddress(address) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_CURRENT_ADDRESS,
            address: address
        });
    }
};

export default LocationActions;
