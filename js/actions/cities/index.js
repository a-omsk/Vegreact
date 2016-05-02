import { API_KEY } from 'ApiKey';
import { getInstance } from 'map';
import store from 'store/configure-store';
import prepareCities from 'utils/prepareCities';
import * as types from 'constants/actions/city';
import find from 'lodash/find';

export const fetchCitiesList = () => (dispatch) => {
    dispatch({
        type: types.FETCH_CITIES
    });
    
    return fetch(`https://catalog.api.2gis.ru/project/list?version=1.3&key=${API_KEY}`)
        .then(response => response.json())
        .then(json => dispatch({
            type: types.FETCH_CITIES_SUCCESS,
            payload: { list: json.result.map(prepareCities) }
        }));
};

export const setCity = (code) => store.dispatch({
    type: types.SET_CITY,
    payload: { current: code }
});

export const resetCity = () => store.dispatch({
    type: types.RESET_CITY
});

export const switchCity = (code) => (dispatch, getState) => {
    const { city } = getState();
    const { lat, lng, zoom } = find(city.list, cityObj => cityObj.code === code);
    const { instance } = getInstance();

    instance.setView([lat, lng], zoom);
}
