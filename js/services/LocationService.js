import LocationActions from '../actions/LocationActions';
import ApiKey from '../ApiKey';
import {get} from 'jquery';
import {isArray} from 'lodash';

const host = "https://laravel-joehill.rhcloud.com/api";
const geoApi = "https://catalog.api.2gis.ru/geo";

const LocationService = {
    getLocations(city, page = 1) {
        if(city) {
            setTimeout(() => LocationActions.blockLoading());

            get(`${host}/map/${city}?page=${page}`).done((result) => {
                if (isArray(result.data) && result.data.length) {
                    const method = (page > 1) ? 'pushLocation' : 'saveLocations';
                    LocationActions[method](result);
                }
            });
        } else {
            setTimeout(() => LocationActions.resetLocations());
        }
    },

    getGroup(city, groupId) {
        get(`${host}/map/${city}/${groupId}`).done((result) => {
            if (result.length) {
                LocationActions.setCurrentGroup(result[0]);
            }
        });
    },

    geocodeCoords(lat, lng) {
        get(`${geoApi}/search?q=${lng},${lat}&version=1.3&key=${ApiKey}`).done(({result}) => {
            if (result && result.length) {
                LocationActions.setCurrentAddress(result[0]);
            }
        });
    }
};

export default LocationService;
