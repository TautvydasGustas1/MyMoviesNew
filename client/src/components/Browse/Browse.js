import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrendingMovies, clearState } from '../../actions/movies';
import PosterCard from '../PosterCard/PosterCard';
import './Browse.css';
import PaginationButtons from '../PaginationButtons/PaginationButtons';
import Spinner from '../layout/Spinner/Spinner';

const Browse = ({
    getTrendingMovies,
    movies: { movies, isFetching },
    clearState
}) => {
    useEffect(() => {
        getTrendingMovies(1);
        return () => {
            clearState();
        };
    }, [getTrendingMovies, clearState]);

    const handlePaginationCallback = page_number => {
        window.scrollTo(0, 0);
        getTrendingMovies(page_number);
    };

    return (
        <section className='browse-container'>
            <div className='browse_summary-container'>
                <h1>Trending Movies</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius, inventore at dicta, explicabo nulla hic ducimus quas
                    natus est sed expedita. Obcaecati expedita asperiores earum
                    rerum! Sint culpa veniam repellendus!
                </p>
            </div>
            <div className='browse_movies-container'>
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

Browse.propTypes = {
    getTrendingMovies: PropTypes.func.isRequired,
    movies: PropTypes.object.isRequired,
    clearState: PropTypes.func
};

const mapStateToProps = state => ({
    movies: state.movies
});

export default connect(mapStateToProps, { getTrendingMovies, clearState })(
    Browse
);
