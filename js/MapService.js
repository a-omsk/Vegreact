import {render} from 'react-dom';
import {createElement} from 'react';
import MapActions from './actions/MapActions';
import CityActions from './actions/CityActions';
import LocationActions from './actions/LocationActions';
import BalloonContent from './components/balloon/BalloonContent';

const mapOptions = {
    'center': [54.98, 73.38],
    'zoom': 14,
    'minZoom': 13,
    'fullscreenControl': false,
    'zoomControl': false,
    'doubleClickZoom': false,
    'projectDetector': true
};

const MapService = {
    initMap() {
        DG.then(function() {
            const Map = DG.map('map', mapOptions);

            Map.on('projectchange', e => {
                let cityCode = e.getProject().code;
                CityActions.setCity(cityCode);
            });

            Map.on('projectleave', e => {
                CityActions.resetCity();
                LocationActions.resetLocations();
            });

            Map.on('dblclick', e => {
                const { lat, lng } = e.latlng;
                const div = document.createElement('div');
                const button = createElement(BalloonContent);

                render(button, div);

                DG.popup()
                    .setLatLng([lat, lng])
                    .setContent(div)
                    .addTo(Map);
            });

            MapActions.saveMap(Map);
        });
    }
};

export default MapService;
