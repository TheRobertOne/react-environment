import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
  // 后续如需配置参数，可在这里配置
});

const configureStore = (preloadedState = {}) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(thunk, createLogger())
        )
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}

export default configureStore;
