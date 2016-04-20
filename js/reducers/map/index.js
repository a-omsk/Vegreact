import {
    SAVE_MAP,
    SAVE_CURRENT_GEOLOCATION,
    SAVE_SELECTED_COORDS
} from 'constants/actions/map';

const initialState = {
    map: {},
    geolocation: {},
    selectedCoordinates: {},
};

export default (state = initialState, action={}) => {
    if (!state.hydrated) {
        state = {
            ...state,
            hydrated: true
        };
    }

    switch (action.type) {
        case SAVE_MAP:
            return {
                ...state,
                map: action.payload.map
            };

        case SAVE_CURRENT_GEOLOCATION:
            return {
                ...state,
                geolocation: action.payload.geolocation
            };

        case SAVE_SELECTED_COORDS:
            return {
                ...state,
                selectedCoordinates: action.payload.coordinates
            };

        default:
            return state;
    }
};
