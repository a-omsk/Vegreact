import {
    FETCH_LOCATIONS,
    FETCH_LOCATIONS_SUCCESS,
    PUSH_LOCATIONS,
    SET_CURRENT_LOCATION,
    RESET_LOCATIONS,
    BLOCK_LOADING
} from 'constants/actions/locations';

const initialState = {
    list: [],
    loaded: false,
    currentGroup: {},
    currentAddress: {},
    isLoading: false,
    currentPage: 0,
    loadable: false,
    blocked: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_LOCATIONS:
            return {
                ...state,
                isLoading: true
            };

        case FETCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                list: action.payload.locations,
                currentPage: action.payload.page,
                loaded: true,
                isLoading: false
            };

        case PUSH_LOCATIONS:
            return {
                ...state,
                list: state.list.push(...action.payload.locations)
            };

        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentGroup: action.payload.group
            };

        case RESET_LOCATIONS:
            return {
                ...state,
                list: [],
                loaded: false
            };

        case BLOCK_LOADING:
            return {
                ...state,
                blocked: true
            };

        default:
            return state;
    }
};
