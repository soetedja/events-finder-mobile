import React, { Component } from 'react';
import AppNavigator from './navigations/AppNavigator';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { API_URL } from './config/config';

axios.defaults.baseURL = API_URL;

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
