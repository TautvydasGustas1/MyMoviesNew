import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Search from './Search/Search';
import { connect } from 'react-redux';
import { searchMovie } from '../../actions/movies';
import PosterCard from '../PosterCard/PosterCard';

const startingQuery = '?searchQuery=';
const SearchPage = ({ searchMovie, movies: { movies: { page, total_pages, results } }, loading }) => {
	return (
		<div>
			<Search startingQuery={startingQuery} searchMovie={searchMovie} />
			<div className='search-movie_container'>
				{!loading && results !== undefined ? (
					<div className='row'>
						{results.map((movie) => (
							<div key={movie.id} className='col-4 col-md-3 col-lg-2dot4'>
								<PosterCard id={movie.id} title={movie.title} poster_path={movie.poster_path} />
							</div>
						))}
					</div>
				) : (
					<Fragment />
				)}
			</div>
		</div>
	);
};

SearchPage.propTypes = {
	searchMovie: PropTypes.func.isRequired,
	movies: PropTypes.object
};

const mapStateToProps = (state) => ({
	movies: state.movies
});

export default connect(mapStateToProps, { searchMovie })(SearchPage);
