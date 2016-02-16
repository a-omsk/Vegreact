import LocationActions from '../actions/LocationActions';
import {get} from 'jquery';
import {isArray} from 'lodash';

const host = "http://laravel-joehill.rhcloud.com/api";

const LocationService = {
    getLocations(city) {
        if(city) {
            get(`${host}/map/${city}?page=1`).done((result) => {
                if (isArray(result.data) && result.data.length) {
                    LocationActions.saveLocations(result.data);
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
    }
};

export default LocationService;
