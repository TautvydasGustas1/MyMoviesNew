import axios from 'axios';
import { GET_PROFILE } from './types';

export const getUserProfile = (username) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/users/${username}`);

		dispatch({
			type: GET_PROFILE,
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
