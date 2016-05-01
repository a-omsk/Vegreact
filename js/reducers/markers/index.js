import {
    FETCH_MARKERS,
    FETCH_MARKERS_SUCCESS,
    REMOVE_MARKERS,
    FIX_MARKERS,
    UNFIX_MARKERS
} from 'constants/actions/markers';

const initialState = {
    list: [],
    isLoading: false,
    loaded: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_MARKERS:
            return {
                ...state,
                isLoading: true
            };

        case FETCH_MARKERS_SUCCESS:
            return {
                ...state,
                list: action.payload.markers,
                isLoading: false
            };

        case REMOVE_MARKERS:
            return {
                ...state,
                list: []
            };

        case FIX_MARKERS:
            return {
                ...state,
                loaded: true
            };

        case UNFIX_MARKERS:
            return {
                ...state,
                loaded: false
            };

        default:
            return state;
    }
};
