import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../actions/movies';
import PosterCard from '../PosterCard/PosterCard';
import './Browse.css';

const Browse = ({ getTrendingMovies, movies: { movies, loading }, location }) => {
	useEffect(
		() => {
			getTrendingMovies(1);
		},
		[
			getTrendingMovies
		]
	);

	const nextPage = (page) => {
		movies.page + 1 <= movies.total_pages && getTrendingMovies(page + 1);
	};

	const prevPage = (page) => {
		movies.page !== 1 && getTrendingMovies(page - 1);
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
						<div className='row'>
							{movies.results.map((movie) => (
								<div key={movie.id} className='col-4 col-md-3 col-lg-2dot4'>
									<PosterCard title={movie.title} id={movie.id} poster_path={movie.poster_path} />
								</div>
							))}
						</div>
						<div className='pagination-outer text-center'>
							<div className='d-inline-flex'>
								<button
									onClick={() => {
										prevPage(movies.page);
									}}
									className={'btn btn-primary ' + (movies.page === 1 && 'disabled')}
								>
									Prev
								</button>
								<div>Page: {movies.page}</div>
								<button
									onClick={() => {
										nextPage(movies.page);
									}}
									className={
										'btn btn-primary ' + (movies.page + 1 >= movies.total_pages && 'disabled')
									}
								>
									Next
								</button>
							</div>
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
