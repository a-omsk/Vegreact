import { browserHistory } from 'react-router';
import MarkerActions from './actions/MarkerActions';
import BalloonService from './services/BalloonService';
import LocationService from './services/LocationService';
import CityStore from './stores/CityStore';
import { get } from 'jquery';
import { isArray } from 'lodash';

const host = 'http://localhost:1337';

const MarkerService = {
    getMarkers(city) {
        get(`${host}/markers/${city}`).done((result) => {
            if (isArray(result) && result.length) {
                MarkerActions.saveMarkers(result);
            }
        });
    },

    createMarker(id, latitude, longitude) {
        if (DG.ready) {
            const veganIcon = DG.icon({
                iconUrl: '/assets/img/marker.svg',
                iconSize: [56, 56]
            });

            const marker = DG.marker([latitude, longitude], {
                icon: veganIcon
            });

            marker.locationId = id;

            marker.on('click', () => {
                browserHistory.push(`/locations/${CityStore.currentCity}/${id}`);
            });

            marker.on('dblclick', ({ latlng: { lat, lng } }) => {
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
    },
};

export default MarkerService;
