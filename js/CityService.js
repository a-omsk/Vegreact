import {get} from 'jquery';
import {isArray} from 'lodash';
import CityStore from './stores/CityStore';
import CityActions from './actions/CityActions';
import ApiKey from './ApiKey';

const coordsRegExp = /\d+.\d+/g;

const prepareCity = (project) => {
    const [lng, lat] = project.centroid.match(coordsRegExp);

    return {
        lat: parseInt(lat, 10),
        lng: parseInt(lng, 10),
        code: project.code,
        name: project.name,
        zoom: parseInt(project.zoomlevel, 10),
        minZoom: parseInt(project.min_zoomlevel, 10)
    };
};

const CityService = {
    fetchCitiesList() {
        const cities = CityStore.getCitiesList();

        if(cities.length) {
            // Do nothing
        } else {
            get(`https://catalog.api.2gis.ru/project/list?version=1.3&key=${ApiKey}`).done((data) => {
                const citiesList = data.result.map(prepareCity);
                CityActions.setCitiesList(citiesList);
            });
        }
    }
};

export default CityService;
