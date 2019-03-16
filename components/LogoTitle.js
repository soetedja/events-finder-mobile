import React from 'react';
import { Image, View } from 'react-native';

export default class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/robot-prod.png')}
          style={{ width: 30, height: 30 }}
        />
      </View>
    );
  }
}
