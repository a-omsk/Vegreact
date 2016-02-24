import keyMirror from 'fbjs/lib/keyMirror';

const ActionTypes = keyMirror({
        SAVE_MAP: null,
        SAVE_MARKERS: null,
        SAVE_LOCATIONS: null,
        PUSH_LOCATIONS: null,
        SET_CITY: null,
        RESET_CITY: null,
        RESET_LOCATIONS: null,
        REMOVE_MARKERS: null,
        GET_CITIES: null,
        TOGGLE_CITY_LIST: null,
        SET_CITIES_LIST: null,
        SET_CURRENT_LOCATION: null,
        BLOCK_LOADING: null,
        SET_TOKEN: null,
        SET_USER: null,
        SET_CURRENT_ADDRESS: null
});

export default ActionTypes;
