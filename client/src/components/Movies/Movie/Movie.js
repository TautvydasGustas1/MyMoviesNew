import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovie } from '../../../actions/movies';
import './Movie.css';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import { MOVIE_DB_URI } from '../../../utils/Constants';
import MovieInfoBox from '../MovieInfoBox/MovieInfoBox';

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

	return (
		<div>
			{!loading && movie !== null ? (
				<div>
					<section className='video-container'>
						<VideoPlayer backdrop_path={movie.backdrop_path} />
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
										src={MOVIE_DB_URI + 'w500' + movie.poster_path}
									/>
								</div>
							</div>
							<div className='movie-info_right col-8'>
								<div className='movie-info'>
									<MovieInfoBox credits={movie.credits} overview={movie.overview} />
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
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
