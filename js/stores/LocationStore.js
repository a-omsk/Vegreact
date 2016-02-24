import AppDispatcher from '../AppDispatcher';
import Polyfill from "babel-polyfill";
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';
import {cloneDeep, pick} from 'lodash';

let _locations = [];
let _currentGroup = {};
let _currentAddress = {};
let _currentPage = 1;
let _loadable = false;
let _blocked = false;

class LocationStore extends EventEmitter {
    constructor(props) {
        super(props);

        const saveLocations = (action) => () => {
            _locations = action.actionType === 'SAVE_LOCATIONS'
                ? action.locations.data
                : _locations.concat(action.locations.data);

            _loadable = action.locations.current_page < action.locations.last_page;
            _currentPage = action.locations.current_page;
            _blocked = false;
            this.emit("change");
        };

        const resetLocations = () => {
            _locations = [];
            this.emit("change");
        };

        const setCurrentLocation = (action) => () => {
            _currentGroup = action.group;
            this.emit("locationSets")
        };

        const setCurrentAddress = (action) => () => {
            const {
                name,
                attributes: {
                    street,
                    number
                }
            } = action.address;

            _currentAddress = {
                name,
                street,
                number
            };

            this.emit('addressSets');
        }

        const blockLoading = () => {
            _blocked = true;
        };

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_LOCATIONS]: saveLocations(action),
                [ActionTypes.PUSH_LOCATIONS]: saveLocations(action),
                [ActionTypes.SET_CURRENT_LOCATION]: setCurrentLocation(action),
                [ActionTypes.SET_CURRENT_ADDRESS]: setCurrentAddress(action),
                [ActionTypes.RESET_LOCATIONS]: resetLocations,
                [ActionTypes.BLOCK_LOADING]: blockLoading
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
            }
        });
    }

    *switchLocation(initialIndex) {
        const group =  _currentGroup;

        if (group && group.locations.length) {
            while(true) {
                yield group.locations[0];
            }
        }
    }

    get locations() {
        return _locations;
    }

    get currentGroup() {
        return cloneDeep(_currentGroup);
    }

    get currentAddress() {
        if (_currentAddress.street) {
            return `${_currentAddress.street}, ${_currentAddress.number}`;

        }

        return _currentAddress.name;
    }

    get canLoadMore() {
        return _loadable;
    }

    get isBlocked() {
        return _blocked;
    }

    get currentPage() {
        return _currentPage;
    }
}

export default new LocationStore;
