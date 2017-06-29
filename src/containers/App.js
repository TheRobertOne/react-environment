import React from 'react';
import PropTypes from 'prop-types';

const App = (props) => {
    return (
        <div>
            app容器
            {props.children}
        </div>
    )
}

App.propTypes = {
    children: PropTypes.any
}

export default App;
