import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';
import {cloneDeep} from 'lodash';

let _locations = [];
let _currentGroup = null;

class LocationStore extends EventEmitter {
    constructor(props) {
        super(props);

        const saveLocations = (action) => () => {
            _locations = action.locations;
            this.emit("change");
        }

        const pushLocations = (action) => () => {
            _locations = _locations.concat(action.locations);
            this.emit("change");
        }

        const resetLocations = () => {
            _locations = [];
            this.emit("change");
        }

        const setCurrentLocation = (action) => () => {
            _currentGroup = action.group;
            this.emit("locationSets")
        }

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_LOCATIONS]: saveLocations(action),
                [ActionTypes.PUSH_LOCATIONS]: pushLocations(action),
                [ActionTypes.SET_CURRENT_LOCATION]: setCurrentLocation(action),
                [ActionTypes.RESET_LOCATIONS]: resetLocations
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
            }
        });
    }

    getLocations() {
        return _locations;
    }

    getCurrentGroup() {
        return cloneDeep(_currentGroup);
    }
}

export default new LocationStore;
