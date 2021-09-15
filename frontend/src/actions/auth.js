import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  GET_USERS,
  FORGOT_PASSWORD
} from '../actions/types';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('api/v1/users/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_FAILED
    });
  }
};

//Register User
export const register =
  ({ firstName, lastName, role, email, password, confirmPassword }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ firstName, lastName, role, email, password, confirmPassword });

    try {
      const res = await axios.post('api/v1/users/signup', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };

//Login User

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('api/v1/users/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  });
  dispatch({
    type: CLEAR_PROFILE
  });
};

export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    

    const body = JSON.stringify({ email });

    

    try {
      const res = await axios.post('api/v1/users/forgotpassword', body, config);

      dispatch({
        type: FORGOT_PASSWORD,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };
