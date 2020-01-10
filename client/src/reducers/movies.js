import { GET_MOVIES_TRENDING, GET_MOVIE_DATA, SEARCH_MOVIES, CLEAR_STATE } from '../actions/types';

const initialState = {
	loading: true,
	movies: [],
	error: {},
	movie: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SEARCH_MOVIES:
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
		case CLEAR_STATE:
			return {
				...state,
				loading: true,
				movies: [],
				movie: null
			};
		default:
			return state;
	}
}
