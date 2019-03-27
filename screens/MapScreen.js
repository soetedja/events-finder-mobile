import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Dimensions,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker, ProviderPropType, Polyline } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
import { GMAPS_API_KEY } from '../config/keys';

import {
  fetchEvents,
  fetchEventsInThisArea,
  setSelectedEvent
} from '../actions';
import PosterMarker from '../components/PosterMarker';
import EventPreview from '../components/EventPreview';
import Colors from '../constants/Colors';
// import MapStyle from '../constants/MapStyle';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      destination: {},
      showBanner: true,
      initialPosition: {
        latitude: 7,
        longitude: -110,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      region: {},
      mapBoundaries: {},
      markers: []
    };
  }

  componentDidMount() {
    this.setState({
      mapLoaded: true,
      userLocation: this.state.initialPosition
    });
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);

        this.setState({
          initialPosition: {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
        this.setState({ region: this.state.initialPosition });
        this.setState({ userLocation: this.state.initialPosition });
        this.setState({
          mapBoundaries: this.getBoundingBox(this.state.initialPosition)
        });

        this.props.fetchEventsInThisArea(this.state.mapBoundaries);
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }

  onRegionChange = region => {
    this.setState({ region });
    this.setState({ mapBoundaries: this.getBoundingBox(region) });
  };

  onMapPress = () => {
    this.setState({ showPreview: false });
  };

  getDirection = event => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${
        event.location.lat
      },${event.location.lng}`);
  };

  getBoundingBox = region => ({
    northLat: region.latitude + region.latitudeDelta, // northLat - max lat
    eastLng: region.longitude + region.longitudeDelta, // eastLng - max lng
    southLat: region.latitude - region.latitudeDelta, // southLat - min lat
    westLng: region.longitude - region.longitudeDelta // westLng - min lng
  });

  searchThisArea = () => {
    this.props.fetchEventsInThisArea(this.state.mapBoundaries);
    // this.props.fetchEvents();
  };

  addEvents = () => {
    this.props.navigation.navigate('EventForm');
  };

  openEventDetail = () => {
    this.props.navigation.navigate('EventDetail');
  };

  renderUserMarker = () => (
    <Marker
      coordinate={{
        latitude: parseFloat(this.state.userLocation.latitude),
        longitude: parseFloat(this.state.userLocation.longitude)
      }}
    >
      <MaterialIcons
        name='my-location'
        color='#4E86D2'
        size={15}
        style={{ backgroundColor: 'transparent' }}
      />
    </Marker>
  );

  renderMarker = events => events.map((event, id) => (
      <Marker
        // title={event.title}
        // image={flagPinkImg}
        key={event._id}
        // pinColor={'#ff00ff'}
        coordinate={{
          latitude: parseFloat(event.location.lat),
          longitude: parseFloat(event.location.lng)
        }}
        onPress={() => {
          this.setState({
            showPreview: true,
            event,
            destination: {
              latitude: parseFloat(event.location.lat),
              longitude: parseFloat(event.location.lng)
            }
          });
          this.props.setSelectedEvent(event);
        }}
      >
        <PosterMarker event={event} id={id} />
      </Marker>
    ));

  renderRoute = () => {
    if (this.state.showPreview) {
      return (
        <MapViewDirections
          origin={this.state.userLocation}
          destination={this.state.destination}
          apikey={GMAPS_API_KEY}
          strokeWidth={3}
          strokeColor={Colors.lightTintColor}
        />
      );
    }
  };

  renderMapInfo = () => (
    <View>
      <Text>Latitude: {this.state.region.latitude}</Text>
      <Text>Longitude: {this.state.region.longitude}</Text>
      <Text>Latitude Delta: {this.state.region.latitudeDelta}</Text>
      <Text>Longitude Delta: {this.state.region.longitudeDelta}</Text>
      <Text>mapBoundaries: </Text>
      <Text>northLat: {this.state.mapBoundaries.northLat}</Text>
      <Text>eastLng: {this.state.mapBoundaries.eastLng}</Text>
      <Text>southLat: {this.state.mapBoundaries.southLat}</Text>
      <Text>westLng: {this.state.mapBoundaries.westLng}</Text>
    </View>
  );

  renderMapButton() {
    if (!this.state.showPreview) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.searchThisArea} style={styles.bubble}>
            <Text>Search this area</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addEvents} style={styles.bubble}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderEventPreview() {
    if (this.state.showPreview) {
      // console.log(this.state.event);

      return (
        <EventPreview
          onClosePreview={this.hideEventPreview}
          openEventDetail={this.openEventDetail}
          event={this.state.event}
          getDirection={this.getDirection}
        />
      );
    }
  }

  hideEventPreview = () => {
    this.setState({ showPreview: false });
  };

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
            onRegionChange={this.onRegionChange}
            onPress={this.onMapPress}
            // customMapStyle={MapStyle}
          >
            {this.renderUserMarker()}
            {this.renderMarker(this.props.events)}
            {this.renderRoute()}
          </MapView>

          {/* {this.renderMapInfo()} */}

          {this.renderMapButton()}
          {this.renderEventPreview()}
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
  fetchEventsInThisArea: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  events: PropTypes.array
};
const mapStateToProps = state => ({
  events: state.event.events || []
});

export default connect(
  mapStateToProps,
  { fetchEvents, fetchEventsInThisArea, setSelectedEvent }
)(MapScreen);
