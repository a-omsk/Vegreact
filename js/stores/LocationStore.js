import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';

let _locations = [];

class LocationStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_LOCATIONS]() {
                    _locations = action.locations;
                },

                [ActionTypes.PUSH_LOCATIONS]() {
                    _locations = _locations.concat(action.locations);
                }
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
                this.emit("change");
            }
        });
    }

    getLocations() {
        return _locations;
    }
}

export default new LocationStore;
