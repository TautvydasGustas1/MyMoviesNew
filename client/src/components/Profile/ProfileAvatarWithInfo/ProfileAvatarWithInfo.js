import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// LikesText change in the future
const ProfileAvatarWithInfo = ({ avatar, email, username, likesText }) => {
	return (
		<Fragment>
			<div className='profile-avatar mt-auto'>
				<img width='100' src={avatar} alt='profile-avatar' />
			</div>
			<div className='profile-info-text_container ml-3'>
				<div className='profile-email'>
					<p className='m-0'>{email}</p>
				</div>
				<div className='profile-username'>
					<p>{username}</p>
				</div>
				<div className='profile-bonus'>
					<p className='m-0'>{likesText}</p>
				</div>
			</div>
		</Fragment>
	);
};

ProfileAvatarWithInfo.propTypes = {
	avatar: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
};

export default ProfileAvatarWithInfo;
