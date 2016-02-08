import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const MapActions = {
    saveMap(mapObject) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_MAP,
            map: mapObject
        });
    }
};

export default MapActions;