import MapActions from './actions/MapActions';
import { init } from 'map';

const MapService = {
    initMap() {
        init().then(MapActions.saveMap);
    }
};

export default MapService;
