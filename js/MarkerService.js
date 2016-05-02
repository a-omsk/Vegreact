import { browserHistory } from 'react-router';
import MarkerActions from './actions/MarkerActions';
import BalloonService from './services/BalloonService';
import LocationService from './services/LocationService';
import CityStore from './stores/CityStore';
import { get } from 'jquery';
import store from 'store/configure-store';
import find from 'lodash/find';

const MarkerService = {
    getMarkerById(id) {
        const { markers } = store.getState();
        return find(markers.list, marker => id === marker.id);
    },

    createMarker(id, latitude, longitude) {
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
    },

    removeMarkers() {
        setTimeout(() => MarkerActions.removeMarkers());
    }
};

export default MarkerService;
