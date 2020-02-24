import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPopularMovies, clearState } from '../../actions/movies';
import PosterCard from '../PosterCard/PosterCard';
import './Popular_Movies.css';
import PaginationButtons from '../PaginationButtons/PaginationButtons';
import Spinner from '../layout/Spinner/Spinner';

const Popular_Movies = ({
    getPopularMovies,
    movies: { movies, isFetching },
    clearState
}) => {
    useEffect(() => {
        getPopularMovies(1);
        return () => {
            clearState();
        };
    }, [getPopularMovies, clearState]);

    const handlePaginationCallback = page_number => {
        window.scrollTo(0, 0);
        getPopularMovies(page_number);
    };

    return (
        <section className='browse-container'>
            <div className='browse_summary-container text-center'>
                <h1>Popular Movies</h1>
            </div>
            <div className='browse_movies-container mt-5'>
                {!isFetching && movies.length !== 0 ? (
                    <div className='browse_movies-container_inner'>
                        <div className='row justify-content-start'>
                            {movies.results.map(movie => (
                                <div
                                    key={movie.id}
                                    className='col-4 col-md-3 col-lg-2dot4'
                                >
                                    <PosterCard
                                        title={movie.title}
                                        id={movie.id}
                                        poster_path={movie.poster_path}
                                    />
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
                    <div className='text-center'>
                        <Spinner width='300px' />
                    </div>
                )}
            </div>
        </section>
    );
};

Popular_Movies.propTypes = {
    getPopularMovies: PropTypes.func.isRequired,
    movies: PropTypes.object.isRequired,
    clearState: PropTypes.func
};

const mapStateToProps = state => ({
    movies: state.movies
});

export default connect(mapStateToProps, { getPopularMovies, clearState })(
    Popular_Movies
);
