import {get} from 'jquery';
import {isArray} from 'lodash';
import CityStore from './stores/CityStore';
import CityActions from './actions/CityActions';
import ApiKey from './ApiKey';

const coordsRegExp = /\d+.\d+/g;

const prepareCity = ({centroid, code, name, zoomlevel, min_zoomlevel}) => {
    const [lng, lat] = centroid.match(coordsRegExp);

    return {
        code,
        name,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: parseInt(zoomlevel, 10),
        minZoom: parseInt(min_zoomlevel, 10)
    };
};

const CityService = {
    fetchCitiesList() {
        const cities = CityStore.citiesList;

        if(cities.length) {
            // Do nothing
        } else {
            get(`https://catalog.api.2gis.ru/project/list?version=1.3&key=${ApiKey}`).done(({result}) => {
                const citiesList = result.map(prepareCity);
                CityActions.setCitiesList(citiesList);
            });
        }
    }
};

export default CityService;
