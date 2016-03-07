import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const MapActions = {
    saveMap(mapObject) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_MAP,
            map: mapObject,
        });
    },

    saveCurrentGeolocation(lat, lng) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_CURRENT_GEOLOCATION,
            geolocation: { lat, lng },
        });
    },
};

export default MapActions;
