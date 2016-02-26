import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const MarkerActions = {
    saveMarkers(markers) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_MARKERS,
            markers: markers
        });
    },

    fixMarkers() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.FIX_MARKERS
        });
    },

    removeMarkers() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.REMOVE_MARKERS
        });
    }
};

export default MarkerActions;
