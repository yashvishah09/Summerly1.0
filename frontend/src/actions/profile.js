import axios from 'axios';
import { setAlert } from './alert';

import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_USERS, UPDATE_USER_FORGOT_PASSWORD } from './types';

//Get current users profile
export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/users/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error }
    });
  }
};

//Update Profile
export const updateCurrentUser = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  try {
    const res = await axios.put('/api/v1/users/updateMe', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Profile updated'));

    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error }
    });
  }
};

export const deleteCurrentUser = () => async (dispatch) => {
  if (window.confirm('Are you sure? This action can not be undone.')) {
    try {
      const res = await axios.delete('/api/v1/users/deleteMe');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your acoount has been permanently deleted!'));
    } catch (err) {
      dispatch({ type: PROFILE_ERROR, payload: { msg: err.response } });
    }
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword =
  ({ password, confirmPassword }, id) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ password, confirmPassword });

    

    try {
      const res = await axios.patch(`/api/v1/users/${id}`, body, config);

      dispatch({
        type: UPDATE_USER_FORGOT_PASSWORD,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };
