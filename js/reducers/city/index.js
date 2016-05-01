import {
    SET_CITY,
    SET_CITIES_LIST,
    RESET_CITY
} from 'constants/actions/city';

const initialState = {
    curent: '',
    list: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CITY:
            return {
                ...state,
                current: action.payload.current
            };

        case SET_CITIES_LIST:
            return {
                ...state,
                list: action.payload.list
            };

        case RESET_CITY:
            return {
                ...state,
                current: ''
            };

        default:
            return state;
    }
};
