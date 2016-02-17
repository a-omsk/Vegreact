import MarkerActions from './actions/MarkerActions';
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

            return DG.marker([lat, lng], {
                icon: veganIcon
            });
        }
    },

    removeMarkers() {
        if (DG.ready) {
            setTimeout(() => MarkerActions.removeMarkers());
        }
    }
};

export default MarkerService;
