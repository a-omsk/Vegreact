import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';

let _map = {};

class MapStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SAVE_MAP]() {
                    _map = action.map;
                }
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
                this.emit("change");
            }
        });
    }

    get get() {
        return _map;
    }
}

export default new MapStore;
