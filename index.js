/**
 * @format
 */
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store from './store';
import { Provider } from 'react-redux';
import Color from './constants/Colors';
import axios from 'axios';
import { API_URL } from './config/config';

axios.defaults.baseURL = API_URL;

export default function Main() {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={Color.darkTintColor}
        barStyle='light-content'
      />
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
