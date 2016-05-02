import { combineReducers } from 'redux';

import city from './city';
import locations from './locations';
import geo from './geo';
import markers from './markers';
import user from './user';
import sidebar from './sidebar';

const rootReducer = combineReducers({
    geo,
    city,
    locations,
    markers,
    user,
    sidebar
});

export default rootReducer;
