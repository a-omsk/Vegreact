import {
    SAVE_USER_COORDINATES,
    SAVE_SELECTED_COORDINATES,
    SET_CURRENT_ADDRESS
} from 'constants/actions/geo';

const initialState = {
    userCoordinates: null,
    selectedCoordinates: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_USER_COORDINATES:
            return {
                ...state,
                userCoordinates: action.payload.coordinates
            };

        case SAVE_SELECTED_COORDINATES:
            return {
                ...state,
                selectedCoordinates: action.payload.coordinates
            };

        case SET_CURRENT_ADDRESS:
            const { name, attributes: { street, number } } = action.payload.address;

            return {
                ...state,
                currentAddress: { name, street, number }
            };

        default:
            return state;
    }
};
