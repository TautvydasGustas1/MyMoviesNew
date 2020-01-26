import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './RateMovie.css';
import { MOVIE_DB_URI } from '../../../../utils/Constants';
import { postWatchedMovie } from '../../../../actions/watched';
import { connect } from 'react-redux';

const pWidth = 'w500';
let display = 'none';

const RateMovie = ({ poster, defaultShow, setShowModal, user_id, movie_id, postWatchedMovie }) => {
	if (defaultShow) {
		display = 'block';
	} else {
		display = 'none';
	}

	const postMovie = (rate) => {
		postWatchedMovie(1, 2, rate);
	};

	return (
		<Fragment>
			<div className='rate-movie_container'>
				<div style={{ display: `${display}` }} className='modal-container'>
					<button
						onClick={() => {
							setShowModal(!defaultShow);
						}}
						type='button'
						className='close'
						aria-label='Close'
					>
						<span style={{ fontSize: '2em' }} className='text-white' aria-hidden='true'>
							&times;
						</span>
					</button>
					<div className='container'>
						<div className='card-container'>
							<div
								style={{ backgroundImage: `url(${MOVIE_DB_URI + pWidth + poster})` }}
								className='card m-auto card-custom'
							>
								<div className='card-body p-0'>a</div>
							</div>
							<div className='modal-buttons_container'>
								<div className='row'>
									<div className='col-2dot4'>
										<button
											onClick={() => {
												postMovie(1);
											}}
											className='btn btn-primary btn-small'
										>
											Bad
										</button>
									</div>
									<div className='col-2dot4'>
										<button
											onClick={() => {
												postMovie(2);
											}}
											className='btn btn-primary btn-small'
										>
											Average
										</button>
									</div>
									<div className='col-2dot4'>
										<button
											onClick={() => {
												postMovie(0);
											}}
											className='btn btn-primary btn-small'
										>
											Haven't seen
										</button>
									</div>
									<div className='col-2dot4'>
										<button
											onClick={() => {
												postMovie(4);
											}}
											className='btn btn-primary btn-small'
										>
											Good
										</button>
									</div>
									<div className='col-2dot4'>
										<button
											onClick={() => {
												postMovie(5);
											}}
											className='btn btn-primary btn-small'
										>
											Perfect
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

RateMovie.propTypes = {
	poster: PropTypes.string.isRequired,
	defaultShow: PropTypes.bool.isRequired,
	setShowModal: PropTypes.func.isRequired
};

export default connect(null, { postWatchedMovie })(RateMovie);
