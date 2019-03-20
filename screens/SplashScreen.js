import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import setAuthToken from '../utils/setAuthToken';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/images/bg_screen2.jpg');

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.authenticateSession();
  }

  authenticateSession() {
    const { navigation } = this.props;
    AsyncStorage.getItem('token')
      .then(token => {
        setAuthToken(token);
        this.navigate(token);
      })
      .catch(() => {
        navigation.navigate('Auth');
      });
  }

  navigate(token) {
    const { navigation } = this.props;
    setTimeout(() => {
      if (token) {
        navigation.navigate('Map');
      } else {
        navigation.navigate('Auth');
      }
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.titleText}>EVENTS+</Text>
            </View>
            <View style={{ marginTop: -10, marginLeft: 10 }}>
              <Text style={styles.titleText}>MOBILE</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular'
  }
});

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
