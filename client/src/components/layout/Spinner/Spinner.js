import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import spinner from '../../images/spinner.gif';

function Spinner({ width }) {
    return (
        <Fragment>
            <img width={width} src={spinner} alt='loading...' />
        </Fragment>
    );
}

Spinner.propTypes = {
    width: PropTypes.string.isRequired
};

export default Spinner;
