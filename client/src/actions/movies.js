import axios from 'axios';
import { GET_MOVIES_TRENDING, GET_MOVIE_DATA, SEARCH_MOVIES, CLEAR_STATE } from './types';

export const getTrendingMovies = (page) => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_STATE });

		const res = await axios.get(`/api/movies/trending/movies?page=${page}`);

		dispatch({
			type: GET_MOVIES_TRENDING,
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

export const getMovie = (id, query) => async (dispatch) => {
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

export const searchMovie = (searchQuery, page_number) => async (dispatch) => {
	try {
		const fullQuery = `?searchQuery=${searchQuery}&page=${page_number}`;
		const res = await axios.get(`/api/movies/search${fullQuery}`);

		dispatch({
			type: SEARCH_MOVIES,
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

export const clearState = () => async (dispatch) => {
	dispatch({
		type: CLEAR_STATE
	});
};
