/* eslint-disable default-case */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  GET_USERS,
  FORGOT_PASSWORD
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  passwordChange: null,
  role: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        role: action.payload.role,
        isAuthenticated: true,
        loading: false
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        passwordChange: action.payload
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        user: action.payload.data.user,
        role: action.payload.data.user.role,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case USER_FAILED:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
