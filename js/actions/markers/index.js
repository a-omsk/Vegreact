import * as types from 'constants/actions/markers';
import api from 'services/api';
import store from 'store/configure-store';

export const fetchMarkers = city => dispatch => {
    dispatch({
        type: types.FETCH_MARKERS
    });

    return api(`/map/${city}/markers`)
        .then(response => response.json())
        .then(markers => dispatch({
            type: types.FETCH_MARKERS_SUCCESS,
            payload: { markers }
        }));
};

export const resetMarkers = () => store.dispatch({
    type: types.RESET_MARKERS
});
