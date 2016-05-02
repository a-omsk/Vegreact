import * as types from 'constants/actions/locations';
import api from 'services/api';
import store from 'store/configure-store';

export const fetchLocations = city => dispatch => {
    dispatch({
        type: types.FETCH_LOCATIONS
    });

    return api(`/map/${city}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: types.FETCH_LOCATIONS_SUCCESS,
                payload: {
                    locations: json.data,
                    page: json.current_page
                }
            });
        });
};

export const resetLocations = () => store.dispatch({
    type: types.RESET_LOCATIONS
});