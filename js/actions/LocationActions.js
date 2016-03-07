import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const LocationActions = {
    saveLocations(locations) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_LOCATIONS,
            locations,
        });
    },

    pushLocation(locations) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.PUSH_LOCATIONS,
            locations,
        });
    },

    resetLocations() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RESET_LOCATIONS,
        });
    },

    setCurrentGroup(group) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_CURRENT_LOCATION,
            group,
        });
    },

    blockLoading() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.BLOCK_LOADING,
        });
    },

    setCurrentAddress(address) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SET_CURRENT_ADDRESS,
            address,
        });
    },
};

export default LocationActions;
