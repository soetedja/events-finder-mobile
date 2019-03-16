import { LOGIN, REGISTER } from './types';
import axios from 'axios';
import qs from 'query-string';
import store from '../store';

export const translate = (username, password) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  // updated to  '...' for loading
  // dispatch({ type: TRANSLATE, payload: '...' });

  axios
    .post(
      'http://mongosilakan.net/api/v1/translate/translate',
      qs.stringify(params),
      config
    )
    .then(res => {
      // Save token to local storage
      let { model } = res.data.content;
      dispatch({ type: TRANSLATE, payload: model.basic });
    })
    .catch(err => console.log(err));
};
