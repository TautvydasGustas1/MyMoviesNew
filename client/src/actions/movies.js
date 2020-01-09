import axios from 'axios';
import { GET_MOVIES_TRENDING, GET_MOVIE_DATA, SEARCH_MOVIES } from './types';

export const getTrendingMovies = (page) => async (dispatch) => {
	try {
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

export const searchMovie = (query) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/movies/search${query}`);

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
