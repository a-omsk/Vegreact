import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const MarkerActions = {
    saveMarkers(markers) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_MARKERS,
            markers: markers
        });
    },

    removeMarkers() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.REMOVE_MARKERS
        });
    }
};

export default MarkerActions;
