import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profiles';
import ProfileAvatarWithInfo from './ProfileAvatarWithInfo/ProfileAvatarWithInfo';
import profileAvatar from '../images/profile-avatar.png';
import './Profile.css';
import Stats from './Stats/Stats';
import Watching from './Watching/Watching';
import Watched from './Watched/Watched';

const Profile = ({ getUserProfile, match, profile: { loading, profile }, watched }) => {
	useEffect(
		() => {
			getUserProfile(match.params.username);
		},
		[
			getUserProfile,
			match.params.username
		]
	);

	const [
		page,
		setPage
	] = useState('stats');

	const changeHalfPage = (pageName) => {
		if (page !== pageName) {
			setPage(pageName);
		}
	};

	return (
		<Fragment>
			{!loading && profile === null ? (
				<div>No user Found!</div>
			) : (
				<Fragment>
					<div className='card'>
						<div
							className='card-body'
							style={{ backgroundImage: 'linear-gradient(to top, #848484, #e1e1e1)' }}
						>
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
								<li onClick={() => changeHalfPage('stats')} className='profile-buttons_button active'>
									Stats
								</li>
								<li
									onClick={() => changeHalfPage('watching')}
									className='profile-buttons_button border-left border-right'
								>
									Watching
								</li>
								<li onClick={() => changeHalfPage('watched')} className='profile-buttons_button'>
									Watched
								</li>
							</ul>
						</div>
					</div>
					<div className='profile-halfPage_container mt-3'>
						<div className='card'>
							<div className='card-body'>
								{page === 'stats' ? <Stats watched={watched} /> : ''}
								{page === 'watched' ? <Watched watched={watched} /> : ''}
								{page === 'watching' ? <Watching /> : ''}
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getUserProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profiles,
	watched: state.watched.watched
});

export default connect(mapStateToProps, { getUserProfile })(Profile);
