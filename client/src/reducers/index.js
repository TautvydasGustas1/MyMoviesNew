import { combineReducers } from 'redux';
import movies from './movies';
import auth from './auth';
import alert from './alert';
import profiles from './profiles';

export default combineReducers({
	movies,
	auth,
	alert,
	profiles
});
