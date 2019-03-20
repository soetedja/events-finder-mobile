import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types';

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
    .post('/users/login', params)
    .then(res => {
      // // Save token to local storage
      const { token } = res.data;
      // // set token to ls
      // localStorage.setItem('jwtToken', token);
      AsyncStorage.setItem('token', token);
      // // set token to auth header
      setAuthToken(token);
      // // decode token to get user data
      const decoded = jwt_decode(token);

      dispatch({ type: LOGIN_SUCCESS, payload: token });
      // // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));
};

// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// Log user out
export const logout = () => dispatch => {
  // remove token from local storage
  AsyncStorage.removeItem('token');
  // // remove auth header for future request
  setAuthToken(false);
  // // set current user to {}
  dispatch(setCurrentUser({}));

  dispatch({ type: LOGOUT_SUCCESS, payload: '' });
};
