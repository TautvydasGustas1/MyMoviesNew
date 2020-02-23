import { GET_PROFILE, GET_PROFILE_WATCHED_MOVIES } from '../actions/types';

const initialState = {
    loading: true,
    profile: {},
    errors: [],
    watched: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILE_WATCHED_MOVIES:
            return {
                ...state,
                watched: payload
            };
        default:
            return state;
    }
}
