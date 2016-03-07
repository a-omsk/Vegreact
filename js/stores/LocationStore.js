import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import { EventEmitter } from 'events';
import { cloneDeep } from 'lodash';

let _locations = [];
let _currentGroup = {};
let _currentAddress = {};
let _currentPage = 0;
let _loadable = false;
let _blocked = false;

class LocationStore extends EventEmitter {
    constructor(props) {
        super(props);

        const saveLocations = ({ actionType, locations }) => () => {
            _locations = actionType === 'SAVE_LOCATIONS'
                ? locations.data
                : _locations.concat(locations.data);

            _loadable = locations.current_page < locations.last_page;
            _currentPage = locations.current_page;
            _blocked = false;
            this.emit('change');
        };

        const resetLocations = () => {
            _locations = [];
            this.emit('change');
        };

        const setCurrentLocation = ({ group }) => () => {
            _currentGroup = group;
            this.emit('locationSets');
        };

        const setCurrentAddress = ({ address }) => () => {
            const {
                name,
                attributes: {
                    street,
                    number,
                },
            } = address;

            _currentAddress = {
                name,
                street,
                number,
            };

            this.emit('addressSets');
        };

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
                [ActionTypes.BLOCK_LOADING]: blockLoading,
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
            }
        });
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
