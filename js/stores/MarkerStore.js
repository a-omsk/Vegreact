import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';

let _markers = [];

class MarkerStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_MARKERS]() {
                    _markers = action.markers;
                }
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
                this.emit("change");
            }
        });
    }

    getAllMarkers() {
        return _markers;
    }
}

export default new MarkerStore;
