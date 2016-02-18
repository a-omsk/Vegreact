import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';
import {cloneDeep} from 'lodash';

let _locations = [];
let _currentGroup = {};
let _currentPage = 1;
let _loadable = false;
let _blocked = false;

class LocationStore extends EventEmitter {
    constructor(props) {
        super(props);

        const saveLocations = (action) => () => {
            _locations = action.actionType === 'SAVE_LOCATIONS' ?
                action.locations.data : _locations.concat(action.locations.data);

            _loadable = action.locations.current_page < action.locations.last_page;
            _currentPage = action.locations.current_page;
            _blocked = false;
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

        const blockLoading = () => {
            _blocked = true;
        }

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_LOCATIONS]: saveLocations(action),
                [ActionTypes.PUSH_LOCATIONS]: saveLocations(action),
                [ActionTypes.SET_CURRENT_LOCATION]: setCurrentLocation(action),
                [ActionTypes.RESET_LOCATIONS]: resetLocations,
                [ActionTypes.BLOCK_LOADING]: blockLoading
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

    canLoadMore() {
        return _loadable;
    }

    isBlocked() {
        return _blocked;
    }

    getCurrentPage() {
        return _currentPage;
    }
}

export default new LocationStore;
