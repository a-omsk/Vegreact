import {
    FETCH_CITIES,
    FETCH_CITIES_SUCCESS,
    SET_CITY,
    RESET_CITY
} from 'constants/actions/city';

const initialState = {
    current: '',
    list: [],
    isLoading: false,
    loaded: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_CITIES:
            return {
                ...state,
                isLoading: true
            };
        case SET_CITY:
            return {
                ...state,
                current: action.payload.current
            };

        case FETCH_CITIES_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                isLoading: false,
                loaded: true
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
