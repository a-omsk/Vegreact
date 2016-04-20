import { combineReducers } from 'redux';

import map from 'reducers/map';
import locations from 'reducers/locations';

const rootReducer = combineReducers({
    map,
    locations,
});

export default rootReducer;
