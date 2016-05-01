import {
    SET_TOKEN,
    SET_USER
} from 'constants/actions/user';

const initialState = {
    user: {},
    token: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            };

        case SET_USER:
            return {
                ...state,
                user: action.payload.user
            };

        default:
            return state;
    }
};
