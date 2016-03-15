import LocationActions from '../actions/LocationActions';
import LocationStore from '../stores/LocationStore';
import ApiKey from '../ApiKey';
import Api from './Api';
import { get, post } from 'jquery';
import { isArray, isObject, cloneDeep } from 'lodash';

const host = 'http://localhost:1337';
const geoApi = 'https://catalog.api.2gis.ru/geo';

const LocationService = {
    getLocations(city) {
        if (city) {
            setTimeout(() => LocationActions.blockLoading());

            get(`${host}/locations/${city}`).done((result) => {
                if (isArray(result) && result.length) {
                    const method = 'saveLocations';
                    LocationActions[method](result);
                }
            });
        } else {
            setTimeout(() => LocationActions.resetLocations());
        }
    },

    getGroup(city, groupId) {
        get(`${host}/locations/${city}/${groupId}`).done((result) => {
            if (result.length) {
                LocationActions.setCurrentGroup(result[0]);
            }
        });
    },

    geocodeCoords(lat, lng) {
        get(`${geoApi}/search?q=${lng},${lat}&version=1.3&key=${ApiKey}`).done(({ result }) => {
            if (result && result.length) {
                LocationActions.setCurrentAddress(result[0]);
            }
        });
    },

    postLocation(location) {
        let _location = cloneDeep(location);
        _location.name = _location.title;
        delete _location.title

        if (isObject(_location.coordinates)) {
            const { lat, lng } = _location.coordinates;
            _location = Object.assign(_location, { lat, lng });
            delete _location.coordinates;
        }

        if (isArray(_location.specification)) {
            _location.specification = _location.specification.join();
        }

        Api.post('locations', _location).then(result => {
            console.info(result);
        });
    },
};

export default LocationService;
