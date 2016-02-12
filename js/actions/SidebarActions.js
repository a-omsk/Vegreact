import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../Constants';

const SidebarActions = {
    toggleCityList() {
        AppDispatcher.dispatch({
            actionType: ActionTypes.TOGGLE_CITY_LIST
        });
    }
};

export default SidebarActions;
