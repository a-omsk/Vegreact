import MapActions from './actions/MapActions';
import CityActions from './actions/CityActions';
import LocationActions from './actions/LocationActions';

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

            MapActions.saveMap(Map);
        });
    }
};

export default MapService;
