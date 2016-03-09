import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import { EventEmitter } from 'events';

let _map = {};
let _geolocation = {};
let _selectedCoordinates = {};

class MapStore extends EventEmitter {
    constructor(props) {
        super(props);

        const saveMap = ({ map }) => () => {
            _map = map;
            this.emit('change');
        };

        const saveGeolocation = ({ geolocation }) => () => {
            _geolocation = geolocation;
            this.emit('newGeolocation');
        };

        const saveSelectedCoords = ({ coordinates }) => () => {
            _selectedCoordinates = coordinates;
            this.emit('newCoordinates');
        };

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_MAP]: saveMap(action),
                [ActionTypes.SAVE_CURRENT_GEOLOCATION]: saveGeolocation(action),
                [ActionTypes.SAVE_SELECTED_COORDS]: saveSelectedCoords(action),
            };

            if (actionList[action.actionType]) { actionList[action.actionType](); }
        });
    }

    get location() {
        return _geolocation;
    }

    get selectedCoordinates() {
        return _selectedCoordinates;
    }

    get get() {
        return _map;
    }
}

export default new MapStore;
