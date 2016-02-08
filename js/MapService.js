import MapActions from './actions/MapActions';

const mapOptions = {
    'center': [54.98, 82.89],
    'zoom': 13
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