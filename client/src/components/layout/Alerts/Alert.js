import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AlertStyle = {
    boxShadow: '0 2px 4px 1px grey',
    position: 'fixed',
    marginTop: '54px',
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
