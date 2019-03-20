import { CREATE_EVENT_SUCCESS, FETCH_EVENT_SUCCESS } from '../actions/types';

const initialState = {
  event: {
    events: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        event: action.payload,
        events: state.events.concat(action.payload)
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        events: action.payload
      };
    default:
      return state;
  }
}
