import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api';

// action creators
// call with a dispatch()

export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({
            type: FETCH_ALL,
            payload: data
        })

        dispatch({ type: END_LOADING});
    } catch(e) {
        console.log(e);
    }
}

export const getPostsBySearch = (query) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(query);

        console.log(data);
        dispatch({
            type: FETCH_BY_SEARCH,
            payload: data
        })
        dispatch({ type: END_LOADING});
    } catch (e) {
        console.log(e);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data});
        dispatch({ type: END_LOADING});
    } catch (e) {
        console.log(e);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (e) {
        console.log(e);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data});
    } catch (error) {
        console.log(error);
    }
}