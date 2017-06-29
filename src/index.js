import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';
import configureStore from './core/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV === 'production') {
    ReactDOM.render(
        <Root store={store} history={history} />,
        document.getElementById('root')
    );
} else {
    const AppContainer = require('react-hot-loader').AppContainer;
    const render = (Component) => {
        ReactDOM.render(
            <AppContainer>
                <Component store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        );
    };

    render(Root);

    if (module.hot) {
        module.hot.accept('./containers/Root', () => {
            render(Root)
        });
    }
}
