import store from 'store/configure-store';
import * as types from 'constants/actions/geo';

export const saveUserCoordinates = (lat, lng) => store.dispatch({
    type: types.SAVE_USER_COORDINATES,
    payload: { coordinates: { lat, lng } }
});
