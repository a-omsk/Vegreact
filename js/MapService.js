import MapActions from './actions/MapActions';
import CityActions from './actions/CityActions';
import LocationActions from './actions/LocationActions';
import SidebarActions from './actions/SidebarActions';
import LocationService from './services/LocationService';
import CityStore from './stores/CityStore';
import MapStore from './stores/MapStores';
import BaloonService from './services/BalloonService';

const getCoordsFromStorage = () => {
    const defaultLocation = [54.98, 73.38]; // Omsk city

    try {
        const storagedCity = localStorage.getItem('city');
        const cityObj = CityStore.findCity(storagedCity);

        if (cityObj && cityObj.lat && cityObj.lng) {
            return [cityObj.lat, cityObj.lng];
        }

        return defaultLocation;
    } catch (e) {
        console.warn(e);
        return defaultLocation;
    }
};

const mapOptions = {
    center: getCoordsFromStorage(),
    zoom: 14,
    minZoom: 13,
    fullscreenControl: false,
    zoomControl: false,
    doubleClickZoom: false,
    projectDetector: true,
};

const MapService = {
    initMap() {
        DG.then(() => {
            const Map = DG.map('map', mapOptions);

            Map.locate({ watch: true, enableHighAccuracy: true })
                .on('locationfound', ({ latitude, longitude }) => {
                    MapActions.saveCurrentGeolocation(latitude, longitude);
                })
                .on('locationerror', ({ message }) => {
                    console.warn(message);
                });

            Map.on('projectchange', ({ getProject }) => {
                const cityCode = getProject().code;
                CityActions.setCity(cityCode);
            });

            Map.on('projectleave', () => {
                CityActions.resetCity();
                LocationActions.resetLocations();
            });

            Map.on('dblclick', ({ latlng: { lat, lng } }) => {
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
                animate: true,
            });
        }
    },

    switchCity(city) {
        const { lat, lng, zoom } = CityStore.findCity(city);
        const Map = MapStore.get;
        Map.setView([lat, lng], zoom);
        SidebarActions.toggleCityList();
    },
};

export default MapService;
