/*
Mananges state for posts reducer

From store as: posts

State: an array of all posts stored on the site (but not necessarily all displayed)

Action types:
    - FETCH_ALL: Changes the state to the action's payload,
        which should be an array of posts. If using the FETCH_ALL, 
        the current state will be overwritten so make sure it's the 
        correct array (ie. make sure there is no error when retrieving
        the data from the db)
    
    - CREATE: Adds a new post to the current state. Returns a new array with 
            the added post.

*/
import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;