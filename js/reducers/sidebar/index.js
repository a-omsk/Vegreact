import {
    SHOW_CITY_LIST,
    HIDE_CITY_LIST
} from 'constants/actions/sidebar';

const initialState = {
    isCityListShown: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SHOW_CITY_LIST:
            return {
                isCityListShown: true
            };

        case HIDE_CITY_LIST:
            return {
                isCityListShown: false
            };

        default:
            return state;
    }
};
