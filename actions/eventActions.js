import axios from 'axios';

import {
  CREATE_EVENT_SUCCESS,
  FETCH_EVENT_SUCCESS,
  SET_SELECTED_EVENT
} from './types';

// Login
export const createEvent = params => dispatch => {
  axios
    .post('/events', params)
    .then(res => {
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => console.log(err));
};

// fetchEvents
export const fetchEvents = params => dispatch => {
  axios
    .get('/events')
    .then(res => {
      dispatch({ type: FETCH_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => console.log(err));
};

// fetchEventsInThisArea
export const fetchEventsInThisArea = params => dispatch => {
  axios
    .post('/events/fetchEventsInThisArea', params)
    .then(res => {
      dispatch({ type: FETCH_EVENT_SUCCESS, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const setSelectedEvent = params => dispatch => {
  dispatch({ type: SET_SELECTED_EVENT, payload: params });
};
