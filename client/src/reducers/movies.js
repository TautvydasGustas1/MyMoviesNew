import {
  REQUEST_MOVIES_TRENDING,
  SUCCESS_MOVIES_TRENDING,
  ERROR_MOVIES_TRENDING,
  REQUEST_SEARCH_MOVIES,
  SUCCESS_SEARCH_MOVIES,
  ERROR_SEARCH_MOVIES,
  GET_MOVIE_DATA,
  CLEAR_STATE,
  ADD_REVIEW,
  GET_REVIEWS,
  LIKE_REVIEW,
  SUCCESS_SEARCH_USERS,
  ERROR_SEARCH_USERS,
  REQUEST_SEARCH_USERS,
} from "../actions/types";

const initialState = {
  loading: true,
  movies: [],
  error: "",
  movie: null,
  reviews: [],
  isFetching: false,
  users: [],
};

export default function (state = initialState, action) {
  const { type, payload, el_id } = action;

  switch (type) {
    case SUCCESS_SEARCH_MOVIES:
    case SUCCESS_MOVIES_TRENDING:
      return {
        ...state,
        movies: payload,
        loading: false,
        isFetching: false,
      };
    case REQUEST_SEARCH_USERS:
    case REQUEST_SEARCH_MOVIES:
    case REQUEST_MOVIES_TRENDING:
      return {
        ...state,
        isFetching: true,
      };
    case ERROR_SEARCH_USERS:
    case ERROR_SEARCH_MOVIES:
    case ERROR_MOVIES_TRENDING:
      return {
        isFetching: false,
        error: payload,
      };
    case SUCCESS_SEARCH_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
        isFetching: false,
      };
    case GET_MOVIE_DATA:
      return {
        ...state,
        movie: payload,
        loading: false,
        isFetching: false,
      };
    case CLEAR_STATE:
      return {
        ...state,
        loading: true,
        movies: [],
        movie: null,
      };
    case ADD_REVIEW:
      return {
        ...state,
        loading: false,
        reviews: [payload, ...state.reviews],
      };
    case GET_REVIEWS:
      return {
        ...state,
        loading: false,
        reviews: payload,
      };
    case LIKE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === el_id ? { ...review, likes: payload } : review
        ),
      };
    default:
      return state;
  }
}
