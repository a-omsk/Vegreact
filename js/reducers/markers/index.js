import {
    SAVE_MARKERS,
    REMOVE_MARKERS,
    FIX_MARKERS,
    UNFIX_MARKERS
} from 'constants/actions/markers';

const initialState = {
    list: [],
    loaded: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_MARKERS:
            return {
                ...state,
                list: action.payload.markers
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
