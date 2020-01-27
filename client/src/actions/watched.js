import axios from 'axios';
import { ADD_WATCHED_MOVIE, GET_WATCHED_MOVIES } from './types';
import { showAlert } from './alert';

export const postWatchedMovie = (user_id, movie_id, rate) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify({ user_id, movie_id, rate });

		await axios.post(`/api/users/movies`, body, config);

		dispatch({
			type: ADD_WATCHED_MOVIE
		});

		//Load GET_WATCHED_MOVIES
		dispatch(getWatchedMovies(user_id));

		//Load alert
		dispatch(showAlert('Successfully added movie to watched list!', 'success'));
	} catch (error) {
		dispatch(showAlert('There was an error adding movie to the list!', 'danger'));
		// update in the future :)
		// dispatch({
		// 	type: GET_MOVIES_TRENDING,
		// 	payload: { msg: error.response.statusText, status: error.response.status }
		// });
		console.log(error);
	}
};

export const getWatchedMovies = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/users/movies/${id}`);

		dispatch({
			type: GET_WATCHED_MOVIES,
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
