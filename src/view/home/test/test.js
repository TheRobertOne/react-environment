import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CSSModules from 'react-css-modules';

import styles from './test.scss';

class Test extends Component {
    render () {
        return (
            <div className='test' styleName='test'>
                <h1>{this.props.title}</h1>
                aaa1111221122112222222
            </div>
        )
    }
}

Test.propTypes = {
    title: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
    return {
        title: state.test.title
    }
}

export default connect(mapStateToProps)(CSSModules(Test, styles));
