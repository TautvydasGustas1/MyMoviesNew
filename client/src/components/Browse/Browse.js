import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../actions/movies';
import PosterCard from '../PosterCard/PosterCard';
import './Browse.css';
import PaginationButtons from '../PaginationButtons/PaginationButtons';

const Browse = ({ getTrendingMovies, movies: { movies, loading } }) => {
	useEffect(
		() => {
			getTrendingMovies(1);
		},
		[
			getTrendingMovies
		]
	);

	const handlePaginationCallback = (page_number) => {
		getTrendingMovies(page_number);
	};

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
				{!loading ? (
					<div className='browse_movies-container_inner'>
						<div className='row justify-content-start'>
							{movies.results.map((movie) => (
								<div key={movie.id} className='col-4 col-md-3 col-lg-2dot4'>
									<PosterCard title={movie.title} id={movie.id} poster_path={movie.poster_path} />
								</div>
							))}
						</div>
						<div className='pagination-outer text-center'>
							<PaginationButtons
								callBackPageNumber={handlePaginationCallback}
								page={movies.page}
								total_pages={movies.total_pages}
							/>
						</div>
					</div>
				) : (
					<div>Loading</div>
				)}
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
