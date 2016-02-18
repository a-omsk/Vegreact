import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {cloneDeep} from 'lodash';
import {EventEmitter} from 'events';

let _user = null;

class UserStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            const actionList = {
                // [ActionTypes.SET_CITY]: setCity(action)
            }

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
            }
        });
    }

    getCurrentUser() {
        return cloneDeep(_user);
    }
}



export default new UserStore;
