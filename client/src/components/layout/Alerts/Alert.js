import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AlertStyle = {
    position: 'fixed',
    top: '54px',
    width: '100%',
    zIndex: '9999',
};

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <div
            key={alert.id}
            style={AlertStyle}
            className={`conatainer-fluid p-2 text-center bg-${alert.bgColor}  text-light`}
        >
            {alert.message}
        </div>
    ));

Alert.propTypes = {
    alert: PropTypes.array,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
