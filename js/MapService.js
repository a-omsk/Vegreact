import MapActions from './actions/MapActions';

const mapOptions = {
    'center': [54.98, 73.38],
    'zoom': 14,
    'minZoom': 13,
    'fullscreenControl': false,
    'zoomControl': false,
    'doubleClickZoom': false
};

const MapService = {
    initMap() {
        DG.then(function() {
            const Map = DG.map('map', mapOptions);
            MapActions.saveMap(Map);
        });
    }
};

export default MapService;
