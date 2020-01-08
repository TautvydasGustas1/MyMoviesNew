import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MovieCardWide from './MovieCardWide/MovieCardWide';
import './Movies.css';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../actions/movies';
import { withRouter } from 'react-router-dom';

const Movies = ({ getTrendingMovies, movies: { movies, loading } }) => {
	useEffect(
		() => {
			getTrendingMovies(1);
		},
		[
			getTrendingMovies
		]
	);

	return (
		<div className='movie_list-container row'>
			{!loading ? (
				movies.results.map((movie) => (
					<div key={movie.id} className='col-6'>
						<MovieCardWide
							title={movie.title}
							id={movie.id}
							backdrop_path={movie.backdrop_path}
							overview={movie.overview}
						/>
					</div>
				))
			) : (
				<div>loading</div>
			)}
			{console.log(movies.results)}
		</div>
	);
};

Movies.propTypes = {
	movies: PropTypes.object.isRequired,
	getTrendingMovies: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	movies: state.movies
});

export default withRouter(connect(mapStateToProps, { getTrendingMovies })(Movies));
