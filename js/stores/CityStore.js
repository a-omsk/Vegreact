import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';

let _currentCity = localStorage.getItem('city') || 'omsk';

class CityStore extends EventEmitter {
    constructor(props) {
        super(props);

        const self = this;

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SET_CITY]() {
                    if (action.city && action.city !== _currentCity) {
                        _currentCity = action.city;

                        localStorage.setItem("city", _currentCity);
                        self.emit("change");
                    }
                }
            };

            if (actionList[action.actionType]) {
                actionList[action.actionType]();
            }
        });
    }

    getCurrentCity() {
        return _currentCity;
    }
}

export default new CityStore;
