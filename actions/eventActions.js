import axios from 'axios';

import { CREATE_EVENT_SUCCESS, FETCH_EVENT_SUCCESS } from './types';

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
