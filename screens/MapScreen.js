import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

import { fetchEvents } from '../actions';
// import flagPinkImg from '../assets/flag-pink.png';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markers: []
    };
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
    this.props.fetchEvents();
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);

        let initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };

        this.setState({ initialPosition: initialRegion });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }

  onRegionChange = region => {
    this.setState({ region });
  };

  searchThisArea = () => {
    // this.props.fetchJobs(this.state.region, () => {
    //   this.props.navigation.navigate('Deck');
    // });
  };

  addEvents = () => {
    this.props.navigation.navigate('EventForm');
  };

  renderMarker = events => events.map(event => (
      <Marker
        title={event.title}
        // image={flagPinkImg}
        key={event._id}
        // pinColor={'#ff00ff'}
        coordinate={{
          latitude: parseFloat(event.location.lat),
          longitude: parseFloat(event.location.lng)
        }}
      />
    ));

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.initialPosition}
            // onPress={this.onMapPress}
          >
            {this.renderMarker(this.props.events)}
            {/* {this.props.events.map(event => (
              <Marker
                title={event.title}
                // image={flagPinkImg}
                key={event._id}
                coordinate={{
                  latitude: event.location.lat,
                  longitude: event.location.lng
                }}
              />
            ))} */}
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.searchThisArea}
              style={styles.bubble}
            >
              <Text>Search this area</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addEvents} style={styles.bubble}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

MapScreen.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
});

MapScreen.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  events: PropTypes.array
};
const mapStateToProps = state => ({
  events: state.event.events || []
});

export default connect(
  mapStateToProps,
  { fetchEvents }
)(MapScreen);
