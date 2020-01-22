import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profiles';
import ProfileAvatarWithInfo from './ProfileAvatarWithInfo/ProfileAvatarWithInfo';
import profileAvatar from '../images/profile-avatar.png';
import './Profile.css';

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
					<div className='card-body' style={{ backgroundImage: 'linear-gradient(to top, #848484, #e1e1e1)' }}>
						<div className='avatar-info_options text-right' style={{ marginBottom: '10em' }}>
							<div>
								<a href='#!'>Edit profile</a>
							</div>
						</div>
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
					<div className='profile-buttons_container'>
						<ul className='profile-buttons_list m-0 p-0'>
							<li className='profile-buttons_button active'>Stats</li>
							<li className='profile-buttons_button border-left border-right'>Watching</li>
							<li className='profile-buttons_button'>Watched</li>
						</ul>
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
