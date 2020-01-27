import { ADD_WATCHED_MOVIE, GET_WATCHED_MOVIES } from '../actions/types';

const initialState = {
	loading: true,
	watched: [],
	errors: []
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_WATCHED_MOVIES:
			return {
				...state,
				loading: false,
				watched: payload
			};
		case ADD_WATCHED_MOVIE:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
