import axios from 'axios';
import { setAlert } from './alert';

import { CREATE_LISTINGS, GET_LISTINGS, GET_A_LISTING, UPDATE_LISTING, DELETE_LISTING, CLEAR_LISTING } from './types';

export const getAllListings = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/listings');

    dispatch({
      type: GET_LISTINGS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const createListing = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  

  try {
    const res = await axios.post('/api/v1/listings',data, config);

    dispatch({
      type: CREATE_LISTINGS,
      payload: res.data
    });

    dispatch(setAlert('Your listings has been uploaded successfully!'));
  } catch (error) {}
};

export const getAListing = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/listings/${id}`);

    dispatch({
      type: GET_A_LISTING,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateListing = (formdata, id, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  try {
    const res = await axios.put(`/api/v1/listings/${id}`, formdata, config);

    dispatch({
      type: UPDATE_LISTING,
      payload: res.data
    });

    history.push('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

export const deleteListing = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This action can not be undone.')) {
    try {
      const res = await axios.delete(`/api/v1/listings/${id}`);

      dispatch({ type: DELETE_LISTING, payload: id });

      dispatch(setAlert('Your listing has been permanently deleted!'));
    } catch (err) {
      console.log(err);
    }
  }
};
