import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profiles';
import ProfileAvatarWithInfo from './ProfileAvatarWithInfo/ProfileAvatarWithInfo';
import profileAvatar from '../images/profile-avatar.png';

const Profile = ({ getUserProfile, match, profile: { loading, profile } }) => {
	useEffect(
		() => {
			getUserProfile(match.params.username);
		},
		[
			getUserProfile,
			match.params.username
		]
	);

	return (
		<Fragment>
			{!loading && profile === null ? (
				<div>No user Found!</div>
			) : (
				<div className='card'>
					<div className='card-body'>
						<div className='avatar-info_container d-inline-flex'>
							{loading ? (
								<div>Loading</div>
							) : (
								<ProfileAvatarWithInfo
									avatar={profileAvatar}
									email={profile.email}
									username={profile.username}
									likesText={'50 likes'}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getUserProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profiles
});

export default connect(mapStateToProps, { getUserProfile })(Profile);
