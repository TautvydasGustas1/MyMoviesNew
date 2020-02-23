import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Search from './Search/Search';
import { connect } from 'react-redux';
import { searchMovie, searchUsers, clearState } from '../../actions/movies';
import PosterCard from '../PosterCard/PosterCard';
import PaginationButtons from '../PaginationButtons/PaginationButtons';
import UserCard from './UserCard/UserCard';
import './SearchPage.css';

let pageSearchValue = '';

const ddOptions = ['Movies', 'Users'];

const SearchPage = ({
    searchMovie,
    searchUsers,
    clearState,
    movies: {
        isFetching,
        loading,
        movies: { page, total_pages, results },
        users
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

    const [dropdownState, setDropdownState] = useState(ddOptions[0]);

    const handleSearch = (searchValue, option) => {
        if (option === 'Movies') {
            pageSearchValue = searchValue;
            searchMovie(searchValue, 1);
        } else {
            searchUsers(searchValue);
        }
    };

    return (
        <Fragment>
            <Search
                search={handleSearch}
                loading={isFetching}
                dropdownState={dropdownState}
                setDropdownState={setDropdownState}
                ddOptions={ddOptions}
            />
            <div className='search-movie_container'>
                {dropdownState === ddOptions[0] ? (
                    !loading && results !== undefined ? (
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
                    )
                ) : (
                    users && (
                        <div className='search-movie_container-inner'>
                            {users.map((user, index) => (
                                <div
                                    key={index}
                                    className='col-12 pl-0 pr-0 mb-3'
                                >
                                    <UserCard
                                        name={user.username}
                                        date={user.date}
                                    />
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </Fragment>
    );
};

SearchPage.propTypes = {
    searchMovie: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    movies: PropTypes.object
};

const mapStateToProps = state => ({
    movies: state.movies
});

export default connect(mapStateToProps, {
    searchMovie,
    searchUsers,
    clearState
})(SearchPage);
