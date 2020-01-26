import axios from 'axios';
import { ADD_WATCHED_MOVIE } from './types';
import { showAlert } from './alert';

export const postWatchedMovie = (user_id, movie_id, rate) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const body = JSON.stringify({ user_id, movie_id, rate });

		const res = await axios.post(`/api/users/movies`, body, config);

		dispatch({
			type: ADD_WATCHED_MOVIE
		});

		dispatch(showAlert('Successfully added movie to watched list!', 'success'));
	} catch (error) {
		// update in the future :)
		// dispatch({
		// 	type: GET_MOVIES_TRENDING,
		// 	payload: { msg: error.response.statusText, status: error.response.status }
		// });
		console.log(error);
	}
};
