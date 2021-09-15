import { CREATE_LISTINGS, GET_LISTINGS, GET_A_LISTING, UPDATE_LISTING, DELETE_LISTING } from '../actions/types';

const initialState = {
  listing: null,
  listings: [],
  loading: true
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LISTINGS:
    case UPDATE_LISTING:
      return {
        ...state,
        listings: [payload, ...state.listings],
        loading: false
      };

    case GET_LISTINGS:
      return {
        ...state,
        listings: payload,
        loading: false
      };

    case GET_A_LISTING:
      return {
        ...state,
        listing: payload,
        loading: false
      };

    case DELETE_LISTING:
      return {
        ...state,
        listings: state.listings.filter((listing) => listing._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
