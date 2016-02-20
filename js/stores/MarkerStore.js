import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';
import MapStore from './MapStores';
import {each, has} from 'lodash';

let _markers = [];

class MarkerStore extends EventEmitter {
    constructor(props) {
        super(props);

        const saveMarkers = (action) => () => {
            _markers = action.markers;
            this.emit("change");
        };

        const removeMarkers = () => {
            const Map = MapStore.get;

            each(Map._layers, (marker) => {
                if (has(marker, '_icon')) {
                    marker.remove();
                }
            });
        };

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_MARKERS]: saveMarkers(action),
                [ActionTypes.REMOVE_MARKERS]: removeMarkers
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
            }
        });
    }

    get allMarkers() {
        return _markers;
    }
}

export default new MarkerStore;
