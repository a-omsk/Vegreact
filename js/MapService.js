import {render} from 'react-dom';
import {createElement} from 'react';
import MapActions from './actions/MapActions';
import CityActions from './actions/CityActions';
import LocationActions from './actions/LocationActions';
import BalloonContent from './components/balloon/BalloonContent';
import UserStore from './stores/UserStore';

const mapOptions = {
    'center': [54.98, 73.38],
    'zoom': 14,
    'minZoom': 13,
    'fullscreenControl': false,
    'zoomControl': false,
    'doubleClickZoom': false,
    'projectDetector': true
};

const createBallonContent = () => {
    const div = document.createElement('div');
    const content = createElement(BalloonContent);

    render(content, div);

    return div;
};

const MapService = {
    initMap() {
        DG.then(function() {
            const Map = DG.map('map', mapOptions);

            Map.on('projectchange', e => {
                let cityCode = e.getProject().code;
                CityActions.setCity(cityCode);
            });

            Map.on('projectleave', () => {
                CityActions.resetCity();
                LocationActions.resetLocations();
            });

            Map.on('dblclick', e => {
                const { lat, lng } = e.latlng;

                DG.popup()
                    .setLatLng([lat, lng])
                    .setContent(createBallonContent())
                    .addTo(Map);
            });

            MapActions.saveMap(Map);
        });
    }
};

export default MapService;
