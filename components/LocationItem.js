import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class LocationItem extends PureComponent {
  _handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id);
    console.log('result', res);
    this.props.onSelectLoc(res);
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this._handlePress}>
        <Text style={styles.option}>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'gray'
  },
  option: {
    fontWeight: 'bold',
    color: '#007AFF'
  }
});

export default LocationItem;
