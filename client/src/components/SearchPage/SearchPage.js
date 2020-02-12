import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Search from './Search/Search';
import { connect } from 'react-redux';
import { searchMovie, clearState } from '../../actions/movies';
import PosterCard from '../PosterCard/PosterCard';
import PaginationButtons from '../PaginationButtons/PaginationButtons';

let pageSearchValue = '';
const SearchPage = ({
    searchMovie,
    clearState,
    movies: {
        isFetching,
        loading,
        movies: { page, total_pages, results }
    }
}) => {
    useEffect(() => {
        return () => {
            clearState();
        };
    }, [clearState]);

    const handlePaginationCallback = page_number => {
        searchMovie(pageSearchValue, page_number);
    };

    const handleSearch = searchValue => {
        pageSearchValue = searchValue;
        searchMovie(searchValue, 1);
    };

    return (
        <div>
            <Search search={handleSearch} loading={isFetching} />
            <div className='search-movie_container'>
                {!loading && results !== undefined ? (
                    results.length === 0 ? (
                        <div>No results found</div>
                    ) : (
                        <div className='search-movie_container-inner'>
                            <div className='row justify-content-start'>
                                {results.map(movie => (
                                    <div
                                        key={movie.id}
                                        className='col-4 col-md-3 col-lg-2dot4'
                                    >
                                        <PosterCard
                                            id={movie.id}
                                            title={movie.title}
                                            poster_path={movie.poster_path}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='pagination-outer text-center'>
                                <PaginationButtons
                                    callBackPageNumber={
                                        handlePaginationCallback
                                    }
                                    page={page}
                                    total_pages={total_pages}
                                    getTrendingMovies={searchMovie}
                                />
                            </div>
                        </div>
                    )
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

const mapStateToProps = state => ({
    movies: state.movies
});

export default connect(mapStateToProps, { searchMovie, clearState })(
    SearchPage
);
