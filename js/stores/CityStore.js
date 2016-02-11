import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';
import {EventEmitter} from 'events';

let _currentCity = localStorage.getItem('city') || 'omsk';

class CityStore extends EventEmitter {
    constructor(props) {
        super(props);

        const setCity = (action) => () => {
            if (action.city) {
                _currentCity = action.city;

                localStorage.setItem("city", _currentCity);
                this.emit("change");
            }
        }

        const resetCity = () => {
            _currentCity = '';
            this.emit("change");
        }

        AppDispatcher.register(action => {
            const actionList = {
                [ActionTypes.SET_CITY]: setCity(action),
                [ActionTypes.RESET_CITY]: resetCity
            }

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
