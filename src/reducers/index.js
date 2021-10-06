import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';

// more than one reducer:
// types must be unique across all reducers
export default combineReducers({
    posts,
    auth
})