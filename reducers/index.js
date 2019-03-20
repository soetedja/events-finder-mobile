import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import eventReducers from './eventReducers';

export default combineReducers({
  user: userReducer,
  auth: authReducer,
  event: eventReducers
});
