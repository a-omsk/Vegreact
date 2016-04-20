import {
    SAVE_LOCATIONS,
    PUSH_LOCATIONS,
    SET_CURRENT_LOCATION,
    SET_CURRENT_ADDRESS,
    RESET_LOCATIONS,
    BLOCK_LOADING,
} from 'constants/actions/locations';

const initialState = {
    list: [],
    currentGroup: {},
    currentAddress: {},
    currentPage: 0,
    loadable: false,
    blocked: false,
};

export default (state = initialState, action={}) => {
    if (!state.hydrated) {
        state = {
            ...state,
            hydrated: true
        };
    }

    switch (action.type) {
        case SAVE_LOCATIONS:
            return {
                ...state,
                list: action.payload.locations
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
        case SET_CURRENT_ADDRESS:
            const { name, attributes: { street, number }} = action.payload.address;

            return {
                ...state,
                currentAddress: { name, street, number }
            };

        case RESET_LOCATIONS:
            return {
                ...state,
                list: [],
            }

        case BLOCK_LOADING:
            return {
                ...state,
                blocked: true,
            }

        default:
            return state;
    }
};
