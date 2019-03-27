import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ImageSample from '../assets/images/robot-dev.png';
import Marker from '../assets/images/marker';

export default class PosterMarker extends Component {
  state = {
    displayPoster: false
  };

  renderPoster = () => {
    if (this.state.displayPoster) {
      return (
        <Image
          source={{
            uri: this.props.event.poster
          }}
          resizeMode='cover'
          style={{
            width: 23,
            height: 23,
            borderRadius: 50
          }}
        />
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>{this.renderPoster()}</View>
        <View style={styles.overlay}>
          {/* <Text style={styles.headline}>
            It should appear in front of the Background Image
          </Text> */}
          <Image
            resizeMode='contain'
            style={{ width: 25 }}
            source={Marker[this.props.id % 10]}
            onLoadEnd={() => this.setState({ displayPoster: true })}
          />
          {/* <SvgUri width='20' svgXmlData={MarkerSvg} /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingLeft: 2
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: -3
  },
  // overlay: {
  //   opacity: 0.5,
  //   backgroundColor: '#000000'
  // },
  logo: {},
  backdrop: {
    flex: 1,
    flexDirection: 'column',
    width: 20,
    height: 20,
    borderRadius: 20 / 2
  },
  headline: {
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white'
  }
});
