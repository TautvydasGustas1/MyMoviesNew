import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovie } from '../../../actions/movies';
import './Movie.css';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import { MOVIE_DB_URI } from '../../../utils/Constants';
import MovieInfoBox from '../MovieInfoBox/MovieInfoBox';
import MovieInformation from './MovieInformation';
import MovieRatingInformation from './MovieRatingInformation';
import PosterNotFound from '../../images/posterNotFound.png';
import RateMovie from './RateMovie/RateMovie';
import avatarDef from '../../images/profile-avatar.png';

const query = '?append_to_response=videos,credits';

const Movie = ({ getMovie, movie: { loading, movie }, match, user, watched }) => {
	useEffect(
		() => {
			getMovie(match.params.id, query);
		},
		[
			getMovie,
			match.params.id
		]
	);

	const [
		showVideo,
		setShowVideo
	] = useState(false);

	const [
		showModal,
		setShowModal
	] = useState(false);

	//Check if movie is in watched list

	return (
		<Fragment>
			{!loading && movie !== null ? (
				<div>
					<section className='video-container' style={showVideo ? { height: '500px' } : { height: '350px' }}>
						<VideoPlayer
							backdrop_path={movie.backdrop_path}
							showVideo={showVideo}
							setShowVideo={setShowVideo}
							YoutubeVideoKey={movie.videos.results.length === 0 ? null : movie.videos.results[0].key}
						/>
					</section>
					<div className='name_tag-container mb-4'>
						<div className='row m-1'>
							<div className='col-6 name_tag-inner'>{movie.title}</div>
							<div className='col-6 text-right'>
								{user !== null && (
									<span>
										{watched.watched.find((data) => data.movie_id === movie.id) ? (
											<div>Watched and rated</div>
										) : (
											<button
												onClick={() => {
													setShowModal(!showModal);
												}}
												className='btn btn-primary'
											>
												Seen
											</button>
										)}
									</span>
								)}
							</div>
						</div>
					</div>

					<div className='movie-info_container'>
						<div className='row'>
							<div className='movie-info_left col-4'>
								<div>
									<img
										alt={movie.title}
										width='100%'
										src={
											movie.poster_path === null ? (
												PosterNotFound
											) : (
												MOVIE_DB_URI + 'w500' + movie.poster_path
											)
										}
									/>
								</div>
							</div>
							<div className='movie-info_right col-8'>
								<div className='movie-info mb-3'>
									<MovieInformation
										overview={movie.overview}
										genres={movie.genres}
										release_date={movie.release_date}
									/>
								</div>
								<div className='movie-info mb-3'>
									<MovieInfoBox
										release={movie.release_date}
										runtime={movie.runtime}
										credits={movie.credits}
										overview={movie.overview}
									/>
								</div>
								<div className='movie-info'>
									<MovieRatingInformation
										vote_average={movie.vote_average}
										vote_count={movie.vote_count}
									/>
								</div>
								<div className='card mt-3'>
									<div className='card-header'>
										<div className='row'>
											<div className='col-6'>Reviews</div>
											<div className='col-6 text-right'>
												<button className='btn btn-small btn-primary'>Write review</button>
											</div>
										</div>
									</div>
									<div className='card-body'>
										<div className='row'>
											<div className='col'>
												<div className='row'>
													<div className='col-12 review-avatar'>
														<img
															className='rounded-circle  mr-2'
															width='35px'
															src={avatarDef}
														/>
														<div className='d-inline-block align-bottom'>
															<div>Username</div>
															<div>Rate</div>
														</div>
													</div>
													<div className='col-12 p-3 review-comment'>
														<p>
															Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
															ducimus alias, accusamus vitae, quia odio natus
															necessitatibus corporis exercitationem repellendus
															consequatur ad unde inventore quas cupiditate, nulla
															eligendi non beatae.
														</p>
													</div>
													<div className='col-12 d-flex'>
														<div className='p-1'>Like 10</div>
														<div className='p-1'>Dislike 3</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{user !== null && (
						<div>
							<RateMovie
								setShowModal={setShowModal}
								defaultShow={showModal}
								poster={movie.paster_path === null ? PosterNotFound : movie.poster_path}
								user_id={user._id}
								movie_id={movie.id}
								title={movie.title}
								poster_path={movie.poster_path}
							/>
						</div>
					)}
				</div>
			) : (
				<div>Loading</div>
			)}
		</Fragment>
	);
};

Movie.propTypes = {
	getMovie: PropTypes.func.isRequired,
	movie: PropTypes.object.isRequired,
	user: PropTypes.object
};

const mapStateToProps = (state) => ({
	movie: state.movies,
	user: state.auth.user,
	watched: state.watched
});

export default connect(mapStateToProps, { getMovie })(Movie);
