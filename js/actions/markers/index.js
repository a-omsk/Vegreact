import * as types from 'constants/actions/markers';
import api from 'services/api';

export const fetchMarkers = city => dispatch => {
    dispatch({
        type: types.FETCH_MARKERS
    });

    return api(`/map/${city}/markers`)
        .then(response => response.json())
        .then(markers => {
            dispatch({
                type: types.FETCH_MARKERS_SUCCESS,
                payload: { markers }
            });

            dispatch({ type: types.FIX_MARKERS });
        });
};
