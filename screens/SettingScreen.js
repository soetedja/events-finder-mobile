import React from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

class SettingScreen extends React.Component {
  static navigationOptions = {
    header: {
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  };

  render() {
    return (
      <View>
        <Button
          title='Reset Liked Jobs'
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor='#f44336'
          onPress={console.log('pressed')}
        />
      </View>
    );
  }
}

export default connect(null)(SettingScreen);
