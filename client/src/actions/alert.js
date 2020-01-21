import { SHOW_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const showAlert = (message, bgColor, timeout = 3500) => (dispatch) => {
	const id = uuid.v4();
	dispatch({
		type: SHOW_ALERT,
		payload: { message, bgColor, id }
    });
    
    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout)
};
