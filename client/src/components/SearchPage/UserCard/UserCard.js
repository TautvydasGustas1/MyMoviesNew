import React from 'react';
import PropTypes from 'prop-types';
import profileAvatar from '../../images/profile-avatar.png';
import { useHistory } from 'react-router-dom';

const UserCard = ({ name, date }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/profile/${name}`);
    };

    return (
        <div
            onClick={() => {
                handleClick();
            }}
            className='card card-body user-search_card'
        >
            <img alt='user-profile-avatar' src={profileAvatar} width='80px' />
            <p className='ml-3'>
                <b>Username:</b> {name}
            </p>
            <p className='ml-3'>
                <b>Date joined:</b> {date.slice(0, 10)}
            </p>
        </div>
    );
};

UserCard.propTypes = {
    name: PropTypes.string,
    date: PropTypes.string
};

export default UserCard;
