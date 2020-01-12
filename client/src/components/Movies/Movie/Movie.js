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

const query = '?append_to_response=videos,credits';

const Movie = ({ getMovie, movie: { loading, movie }, match }) => {
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
						<div className='name_tag-inner'>{movie.title}</div>
					</div>
					<div className='movie-info_container'>
						<div className='row'>
							<div className='movie-info_left col-4'>
								<div>
									<img
										alt={movie.title}
										width='150px'
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
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</Fragment>
	);
};

Movie.propTypes = {
	getMovie: PropTypes.func.isRequired,
	movie: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	movie: state.movies
});

export default connect(mapStateToProps, { getMovie })(Movie);
