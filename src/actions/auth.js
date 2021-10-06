import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

// action creators
// call with a dispatch()

export const signin = (formData, history) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.signIn(formData);
        console.log(data);
        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        console.log(error);
    }
};