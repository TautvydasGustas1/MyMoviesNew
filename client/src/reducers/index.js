import { combineReducers } from 'redux';
import movies from './movies';
import auth from './auth';
import alert from './alert';
import profiles from './profiles';
import watched from './watched';

export default combineReducers({
	movies,
	auth,
	alert,
	profiles,
	watched
});
