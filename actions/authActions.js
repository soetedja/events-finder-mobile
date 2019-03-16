import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';

// Register user
export const register = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(() => history.push('/login'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

// Login
export const login = params => dispatch => {
  axios
    .post('http://localhost:5000/users/login', params)
    .then(res => {
      console.log(res);
      // // Save token to local storage
      const { token } = res.data;
      // // set token to ls
      // localStorage.setItem('jwtToken', token);
      // // set token to auth header
      // setAuthToken(token);
      // // decode token to get user data
      const decoded = jwt_decode(token);
      console.log(decoded);
      // // set current user
      // dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));
};

// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// Log user out
export const logoutUser = () => dispatch => {
  // remove token from local storage
  // localStorage.removeItem('jwtToken');
  // // remove auth header for future request
  // setAuthToken(false);
  // // set current user to {}
  // dispatch(setCurrentUser({}));
};
