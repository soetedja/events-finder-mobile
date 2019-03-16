import { REGISTER, LOGIN, GET_CURRENT_USER } from '../actions/types';

const initialState = {};

/**
 * User Reducer
 * @param {object} state The state.
 * @param {object} action The action.
 * @returns {object} The current state
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        fromLanguage: action.payload
      };
    case LOGIN:
      return {
        ...state,
        toLanguage: action.payload
      };
    case GET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}
