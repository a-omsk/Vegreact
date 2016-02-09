import MarkerActions from './actions/MarkerActions';
import {get} from 'jquery';
import {isArray} from 'lodash';

const MapService = {
    getMarkers(city) {
        get(`http://laravel-joehill.rhcloud.com/api/map/${city}/markers`).done((result) => {
            if (isArray(result) && result.length) {
                MarkerActions.saveMarkers(result);
            }
        });
    },

    createMarker(lat, lng) {
        if (DG.marker) {
            return DG.marker([lat, lng]);
        }
    }
};

export default MapService;
