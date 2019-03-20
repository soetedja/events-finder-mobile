import {
  SET_CURRENT_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../actions/types';
import isEmpty from '../validations/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case LOGIN_SUCCESS:
      return { token: action.payload };
    case LOGIN_FAIL:
      return { token: null };
    case LOGOUT_SUCCESS:
      return { token: action.payload };
    default:
      return state;
  }
}
