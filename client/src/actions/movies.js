import axios from "axios";
import {
  REQUEST_MOVIES_TRENDING,
  SUCCESS_MOVIES_TRENDING,
  ERROR_MOVIES_TRENDING,
  REQUEST_SEARCH_MOVIES,
  SUCCESS_SEARCH_MOVIES,
  ERROR_SEARCH_MOVIES,
  GET_MOVIE_DATA,
  CLEAR_STATE,
  SUCCESS_SEARCH_USERS,
  ERROR_SEARCH_USERS,
  REQUEST_SEARCH_USERS,
} from "./types";

const requestAction = (typeName) => {
  return {
    type: REQUEST_SEARCH_MOVIES,
  };
};

const successAction = (data, typeName) => {
  return {
    type: typeName,
    payload: data,
  };
};

const errorAction = (error, typeName) => {
  return {
    type: typeName,
    payload: error,
  };
};

export const getTrendingMovies = (page) => async (dispatch) => {
  dispatch(requestAction(REQUEST_MOVIES_TRENDING));
  await axios
    .get(`/api/movies/trending/movies?page=${page}`)
    .then((response) => {
      dispatch(successAction(response.data, SUCCESS_MOVIES_TRENDING));
    })
    .catch((error) => {
      dispatch(errorAction(error.message, ERROR_MOVIES_TRENDING));
    });
};

export const getPopularMovies = (page) => async (dispatch) => {
  dispatch(requestAction(REQUEST_MOVIES_TRENDING));
  await axios
    .get(`/api/movies/popular/movies?page=${page}`)
    .then((response) => {
      dispatch(successAction(response.data, SUCCESS_MOVIES_TRENDING));
    })
    .catch((error) => {
      dispatch(errorAction(error.message, ERROR_MOVIES_TRENDING));
    });
};

export const getMovie = (id, query) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/movies/movie/${id}${query}`);

    dispatch({
      type: GET_MOVIE_DATA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_MOVIES_TRENDING,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    console.log(error);
  }
};

export const searchMovie = (searchQuery, page_number) => async (dispatch) => {
  dispatch(requestAction(REQUEST_SEARCH_MOVIES));
  const fullQuery = `?searchQuery=${searchQuery}&page=${page_number}`;
  await axios
    .get(`/api/movies/search${fullQuery}`)
    .then((response) => {
      dispatch(successAction(response.data, SUCCESS_SEARCH_MOVIES));
    })
    .catch((error) => {
      dispatch(errorAction(error.message, ERROR_SEARCH_MOVIES));
    });
};

export const searchUsers = (searchQuery) => async (dispatch) => {
  dispatch(requestAction(REQUEST_SEARCH_USERS));
  await axios
    .get(`/api/users/search/users/${searchQuery}`)
    .then((response) => {
      dispatch(successAction(response.data, SUCCESS_SEARCH_USERS));
    })
    .catch((error) => {
      dispatch(errorAction(error.message, ERROR_SEARCH_USERS));
    });
};

export const clearState = () => async (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
  });
};
