/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Slides from '../components/Slides';
import _ from 'lodash';

const SLIDE_DATA = [
  { text: 'Welcome to Events Finder app', color: '#03a9f4' },
  { text: 'Use this to find events around you', color: '#009688' },
  { text: 'Let\'s get started', color: '#03a9f4' }
];

export default class WelcomeScreen extends React.Component {
  state = { token: null };

  async UNSAFE_componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    // AsyncStorage.removeItem('fb_token');
    if (token) {
      this.setState({ token });
      this.props.navigation.navigate('Review');
    } else {
      this.setState({ token: false });
    }
  }

  onSlideComplete = () => {
    this.props.navigation.navigate('Auth');
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.container}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};
