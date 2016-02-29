import MapActions from './actions/MapActions';
import CityActions from './actions/CityActions';
import LocationActions from './actions/LocationActions';
import SidebarActions from './actions/SidebarActions';
import LocationService from './services/LocationService';
import CityStore from './stores/CityStore';
import UserStore from './stores/UserStore';
import MapStore from './stores/MapStores';
import BaloonService from './services/BalloonService';

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

            Map.on('projectleave', () => {
                CityActions.resetCity();
                LocationActions.resetLocations();
            });

            Map.on('dblclick', ({latlng: { lat, lng }}) => {
                LocationService.geocodeCoords(lat, lng);

                DG.popup()
                    .setLatLng([lat, lng])
                    .setContent(BaloonService.createContent())
                    .addTo(Map);
            });

            MapActions.saveMap(Map);
        });
    },

    panTo(lat, lng) {
        if (DG.ready) {
        const Map = MapStore.get;
            Map.panTo([lat, lng], {
                animate: true
            });
        }
    },

    switchCity(city) {
        const {lat, lng, zoom} = CityStore.findCity(city);
        const Map = MapStore.get;
        Map.setView([lat, lng], zoom);
        SidebarActions.toggleCityList();
    }
};

export default MapService;
