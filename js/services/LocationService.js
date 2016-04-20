import LocationActions from '../actions/LocationActions';
import LocationStore from '../stores/LocationStore';
import ApiKey from '../ApiKey';
import { get, post } from 'jquery';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';

const host = 'https://laravel-joehill.rhcloud.com/api';
const geoApi = 'https://catalog.api.2gis.ru/geo';

const LocationService = {
    getLocations(city) {
        if (city) {
            const page = LocationStore.currentPage + 1;

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
        get(`${geoApi}/search?q=${lng},${lat}&version=1.3&key=${ApiKey}`).done(({ result }) => {
            if (result && result.length) {
                LocationActions.setCurrentAddress(result[0]);
            }
        });
    },

    postLocation(location) {
        const _location = cloneDeep(location);

        if (_location.businessTime) {
            _location.business_time = _location.businessTime;
            delete _location.businessTime;
        }

        if (isObject(_location.coordinates)) {
            const { coordinates: { lat, lng } } = _location;
            _location.coordinates = `${lat}, ${lng}`;
        }

        if (isArray(_location.specification)) {
            _location.specification = _location.specification.join();
        }

        post(`${host}/map`, _location).done(result => {
            console.info(result);
        });
    },
};

export default LocationService;
