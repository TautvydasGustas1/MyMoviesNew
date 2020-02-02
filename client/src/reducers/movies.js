import {
	GET_MOVIES_TRENDING,
	GET_MOVIE_DATA,
	SEARCH_MOVIES,
	CLEAR_STATE,
	ADD_REVIEW,
	GET_REVIEWS,
	LIKE_REVIEW
} from '../actions/types';

const initialState = {
	loading: true,
	movies: [],
	error: {},
	movie: null,
	reviews: []
};

export default function(state = initialState, action) {
	const { type, payload, el_id } = action;

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
		case ADD_REVIEW:
			return {
				...state,
				loading: false,
				reviews: [
					payload,
					...state.reviews
				]
			};
		case GET_REVIEWS:
			return {
				...state,
				loading: false,
				reviews: payload
			};
		case LIKE_REVIEW:
			return {
				...state,
				reviews: state.reviews.map((review) => (review.id === el_id ? { ...review, review: payload } : review))
			};
		default:
			return state;
	}
}
