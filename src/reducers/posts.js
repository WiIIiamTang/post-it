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
import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL } from '../constants/actionTypes';

const actioner = (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload );
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id===action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts
    }
};

export default actioner;