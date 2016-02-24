import MarkerActions from './actions/MarkerActions';
import BalloonService from './services/BalloonService';
import LocationService from './services/LocationService';
import {get} from 'jquery';
import {isArray} from 'lodash';

const MarkerService = {
    getMarkers(city) {
        get(`https://laravel-joehill.rhcloud.com/api/map/${city}/markers`).done((result) => {
            if (isArray(result) && result.length) {
                MarkerActions.saveMarkers(result);
            }
        });
    },

    createMarker(lat, lng) {
        if (DG.ready) {
            const veganIcon = DG.icon({
                iconUrl: '/assets/img/marker.svg',
                iconSize: [56, 56]
            });

            const marker = DG.marker([lat, lng], {
                icon: veganIcon
            });

            marker.on('dblclick', (e) => {
                const { lat, lng } = e.latlng;
                LocationService.geocodeCoords(lat, lng);

                marker.bindPopup(BalloonService.createContent('marker')).openPopup();
            });

            return marker;
        }
    },

    removeMarkers() {
        if (DG.ready) {
            setTimeout(() => MarkerActions.removeMarkers());
        }
    }
};

export default MarkerService;
