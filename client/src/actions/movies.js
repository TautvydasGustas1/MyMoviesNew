import axios from 'axios';
import {
    REQUEST_MOVIES_TRENDING,
    SUCCESS_MOVIES_TRENDING,
    ERROR_MOVIES_TRENDING,
    REQUEST_SEARCH_MOVIES,
    SUCCESS_SEARCH_MOVIES,
    ERROR_SEARCH_MOVIES,
    GET_MOVIE_DATA,
    CLEAR_STATE
} from './types';

const requestMoviesTrending = () => {
    return {
        type: REQUEST_MOVIES_TRENDING
    };
};

const successMoviesTrending = movies => {
    return {
        type: SUCCESS_MOVIES_TRENDING,
        payload: movies
    };
};

const errorMoviesTrending = error => {
    return {
        type: ERROR_MOVIES_TRENDING,
        payload: error
    };
};

const requestSearchMovies = () => {
    return {
        type: REQUEST_SEARCH_MOVIES
    };
};

const successSearchMovies = searchResults => {
    return {
        type: SUCCESS_SEARCH_MOVIES,
        payload: searchResults
    };
};

const errorSearchMovies = error => {
    return {
        type: ERROR_SEARCH_MOVIES,
        payload: error
    };
};

export const getTrendingMovies = page => async dispatch => {
    dispatch(requestMoviesTrending());
    await axios
        .get(`/api/movies/trending/movies?page=${page}`)
        .then(response => {
            dispatch(successMoviesTrending(response.data));
        })
        .catch(error => {
            dispatch(errorMoviesTrending(error.message));
        });
};

export const getMovie = (id, query) => async dispatch => {
    try {
        const res = await axios.get(`/api/movies/movie/${id}${query}`);

        dispatch({
            type: GET_MOVIE_DATA,
            payload: res.data
        });
    } catch (error) {
        // update in the future :)
        // dispatch({
        // 	type: GET_MOVIES_TRENDING,
        // 	payload: { msg: error.response.statusText, status: error.response.status }
        // });
        console.log(error);
    }
};

export const searchMovie = (searchQuery, page_number) => async dispatch => {
    dispatch(requestSearchMovies());
    const fullQuery = `?searchQuery=${searchQuery}&page=${page_number}`;
    await axios
        .get(`/api/movies/search${fullQuery}`)
        .then(response => {
            dispatch(successSearchMovies(response.data));
        })
        .catch(error => {
            dispatch(errorSearchMovies(error.message));
        });
};

export const clearState = () => async dispatch => {
    dispatch({
        type: CLEAR_STATE
    });
};
