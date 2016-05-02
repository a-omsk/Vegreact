import { get } from 'jquery';
import CityStore from './stores/CityStore';
import CityActions from './actions/CityActions';
import ApiKey from './ApiKey';

const CityService = {
    fetchCitiesList() {
        const cities = CityStore.citiesList;

        if (cities.length) {
            // Do nothing
        } else {
            get(`https://catalog.api.2gis.ru/project/list?version=1.3&key=${ApiKey}`).done(({ result }) => {
                const citiesList = result.map(prepareCity);
                CityActions.setCitiesList(citiesList);
            });
        }
    },
};

export default CityService;
