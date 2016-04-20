import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

function configureStore() {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    );

    if (module.hot) {
        module.hot.accept('reducers', () => {
            const nextReducer = require('reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

export default configureStore(rootReducer);
