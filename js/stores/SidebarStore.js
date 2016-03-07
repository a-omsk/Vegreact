import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import { EventEmitter } from 'events';

let _CityListView = false;

class SidebarStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.TOGGLE_CITY_LIST]() {
                    _CityListView = !_CityListView;
                },
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
                this.emit('change');
            }
        });
    }

    get viewState() {
        return _CityListView;
    }
}

export default new SidebarStore;
