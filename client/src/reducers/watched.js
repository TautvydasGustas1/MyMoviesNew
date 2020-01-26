import { ADD_WATCHED_MOVIE } from '../actions/types';

const initialState = {
	loading: true,
	watched: [],
	errors: []
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADD_WATCHED_MOVIE:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
