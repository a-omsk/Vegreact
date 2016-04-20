import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import MapStore from './MapStores';
import { EventEmitter } from 'events';
import each from 'lodash/each';
import has from 'lodash/has';
import find from 'lodash/find';

let _markers = [];
let _markersLoaded = false;

class MarkerStore extends EventEmitter {
    constructor(props) {
        super(props);

        const saveMarkers = ({ markers }) => () => {
            _markers = markers;
            this.emit('change');
        };

        const fixMarkers = () => {
            _markersLoaded = true;
            this.emit('markersLoaded');
        };

        const removeMarkers = () => {
            const Map = MapStore.get;

            each(Map._layers, (marker) => {
                if (has(marker, '_icon')) {
                    marker.remove();
                }
            });

            _markersLoaded = false;
        };

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_MARKERS]: saveMarkers(action),
                [ActionTypes.REMOVE_MARKERS]: removeMarkers,
                [ActionTypes.FIX_MARKERS]: fixMarkers,
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
            }
        });
    }

    getMarkerById(id) {
        return find(_markers, marker => id === marker.id);
    }

    get allMarkers() {
        return _markers;
    }

    get loaded() {
        return _markersLoaded;
    }
}

export default new MarkerStore;
