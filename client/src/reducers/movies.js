import { GET_MOVIES_TRENDING, GET_MOVIE_DATA } from '../actions/types';

const initialState = {
	loading: true,
	movies: [],
	error: {},
	movie: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_MOVIES_TRENDING:
			return {
				...state,
				movies: payload,
				loading: false
			};
		case GET_MOVIE_DATA:
			return {
				...state,
				movie: payload,
				loading: false
			};
		default:
			return state;
	}
}
