import axios from 'axios';
import { ADD_REVIEW, GET_REVIEWS, LIKE_REVIEW } from './types';
import { showAlert } from './alert';

export const postReview = (comment, username, movie_id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        //To do change to take from db
        const rate = 5;

        const body = JSON.stringify({ username, movie_id, rate, comment });

        const res = await axios.post(
            `/api/users/movies/${movie_id}/review`,
            body,
            config
        );

        dispatch({
            type: ADD_REVIEW,
            payload: res.data
        });

        //Load alert
        dispatch(showAlert('Successfully added review!', 'success'));
    } catch (error) {
        dispatch(showAlert('There was an error adding review!', 'danger'));
        // update in the future :)
        // dispatch({
        // 	type: GET_MOVIES_TRENDING,
        // 	payload: { msg: error.response.statusText, status: error.response.status }
        // });
        console.log(error);
    }
};

export const getReviews = movie_id => async dispatch => {
    try {
        const res = await axios.get(`/api/users/movies/${movie_id}/review`);

        dispatch({
            type: GET_REVIEWS,
            payload: res.data
        });
    } catch (error) {
        dispatch(showAlert('Error while getting the reviews :/!', 'danger'));
        // update in the future :)
        // dispatch({
        // 	type: GET_MOVIES_TRENDING,
        // 	payload: { msg: error.response.statusText, status: error.response.status }
        // });
        console.log(error);
    }
};

export const likeUnlikeReview = (id, user_id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ user_id });

        const res = await axios.put(
            `/api/users/movies/review/likes/${id}`,
            body,
            config
        );

        dispatch({
            type: LIKE_REVIEW,
            payload: res.data.likes,
            el_id: id
        });
    } catch (error) {
        dispatch(showAlert('Error while updating likes :/', 'danger'));
        // update in the future :)
        // dispatch({
        // 	type: GET_MOVIES_TRENDING,
        // 	payload: { msg: error.response.statusText, status: error.response.status }
        // });
        console.log(error);
    }
};
