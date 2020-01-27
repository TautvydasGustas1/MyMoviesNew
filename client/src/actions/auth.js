import axios from 'axios';
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { showAlert } from './alert';
import { getWatchedMovies } from './watched';

//Load user to state
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		// ADD WATCHED MOVIES

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});

		// LOAD WATCHED MOVIES
		dispatch(getWatchedMovies(res.data._id));
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

//Login user
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(`/api/auth`, body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
		dispatch(showAlert('Successfully logged in!', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		dispatch({
			type: LOGIN_FAIL,
			payload: errors
		});
	}
};

//Register user
export const register = (email, username, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ email, username, password });

	try {
		const res = await axios.post(`/api/users`, body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;
		dispatch({
			type: REGISTER_FAIL,
			payload: errors
		});
	}
};

//Logout + Clear profile
export const logout = () => (dispatch) => {
	//dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
	localStorage.removeItem('token');
};
