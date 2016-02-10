import LocationActions from './actions/LocationActions';
import {get} from 'jquery';
import {isArray} from 'lodash';

const LocationService = {
    getLocations(city) {
        if(city) {
            get(`http://laravel-joehill.rhcloud.com/api/map/${city}?page=1`).done((result) => {
                if (isArray(result.data) && result.data.length) {
                    LocationActions.saveLocations(result.data);
                }
            });
        } else {
            setTimeout(() => LocationActions.resetLocations());
        }
    }
};

export default LocationService;
