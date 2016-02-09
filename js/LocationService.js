import LocationActions from './actions/LocationActions';
import {get} from 'jquery';
import {isArray} from 'lodash';

const LocationService = {
    getLocations(city) {
        get(`http://laravel-joehill.rhcloud.com/api/map/${city}?page=1`).done((result) => {
            if (isArray(result.data) && result.data.length) {
                LocationActions.saveLocations(result.data);
            }
        });
    }
};

export default LocationService;
