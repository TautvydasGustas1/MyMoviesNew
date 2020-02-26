import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div
            key={alert.id}
            style={{
                boxShadow: '0 2px 4px 1px grey',
                zIndex: '15',
                position: 'fixed',
                width: '100%'
            }}
            className={`conatainer-fluid p-2 text-center bg-${alert.bgColor}  text-light`}
        >
            {alert.message}
        </div>
    ));

Alert.propTypes = {
    alert: PropTypes.array
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
