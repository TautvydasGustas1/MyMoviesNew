import axios from 'axios';
import { GET_PROFILE, GET_PROFILE_WATCHED_MOVIES } from './types';

export const getUserProfile = username => async dispatch => {
    try {
        const res = await axios.get(`/api/users/${username}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        // LOAD WATCHED MOVIES
        dispatch(getUserWatchedMovies(res.data._id));
    } catch (error) {
        // update in the future :)
        // dispatch({
        // 	type: GET_MOVIES_TRENDING,
        // 	payload: { msg: error.response.statusText, status: error.response.status }
        // });
        console.log(error);
    }
};

export const getUserWatchedMovies = id => async dispatch => {
    try {
        const res = await axios.get(`/api/users/movies/${id}`);

        dispatch({
            type: GET_PROFILE_WATCHED_MOVIES,
            payload: res.data
        });
    } catch (error) {
        // update in the future :)
        // dispatch({
        // 	type: GET_MOVIES_TRENDING,
        // 	payload: { msg: error.response.statusText, status: error.response.status }
        // });
    }
};
