import { combineReducers } from 'redux';

import map from './map';
import city from './city';
import locations from './locations';
import markers from './markers';
import user from './user';
import sidebar from './sidebar';

const rootReducer = combineReducers({
    map,
    city,
    locations,
    markers,
    user,
    sidebar
});

export default rootReducer;
