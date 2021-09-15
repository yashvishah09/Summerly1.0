import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_USERS, UPDATE_USER_FORGOT_PASSWORD } from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: true,
  error: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case UPDATE_USER_FORGOT_PASSWORD:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        profiles: action.payload
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: [],
        loading: false
      };
    default:
      return state;
  }
}
