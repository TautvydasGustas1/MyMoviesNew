import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../actions/movies';
import PosterCard from '../PosterCard/PosterCard';

const Browse = ({ getTrendingMovies, movies: { movies, loading } }) => {
	useEffect(
		() => {
			getTrendingMovies(1);
		},
		[
			getTrendingMovies
		]
	);

	return (
		<section className='browse-container'>
			<div className='browse_summary-container'>
				<h1>Trending Movies</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, inventore at dicta, explicabo nulla
					hic ducimus quas natus est sed expedita. Obcaecati expedita asperiores earum rerum! Sint culpa
					veniam repellendus!
				</p>
			</div>
			<div className='browse_movies-container'>
				<div className='row'>
					{!loading ? (
						movies.results.map((movie) => (
							<div key={movie.id} className='col-4 col-md-3 col-lg-2'>
								<PosterCard title={movie.title} id={movie.id} poster_path={movie.poster_path} />
							</div>
						))
					) : (
						<div>Loading</div>
					)}
				</div>
			</div>
		</section>
	);
};

Browse.propTypes = {
	getTrendingMovies: PropTypes.func.isRequired,
	movies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	movies: state.movies
});

export default connect(mapStateToProps, { getTrendingMovies })(Browse);
